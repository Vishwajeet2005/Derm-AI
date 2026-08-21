from fastapi import APIRouter, Query, HTTPException
import os
import uuid
import requests
import json
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

def fetch_wikipedia_image(query: str):
    try:
        url = 'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=' + query
        headers = {'User-Agent': 'DermAI-Bot/1.0'}
        res = requests.get(url, headers=headers, timeout=5)
        data = res.json()
        pages = data.get('query', {}).get('pages', {})
        
        images = []
        for page_id, page_info in pages.items():
            if 'original' in page_info:
                images.append(page_info['original']['source'])
        
        return images
    except Exception as e:
        logger.error(f"Wikipedia API error: {e}")
        return []

@router.get("")
async def search_disease(q: str = Query(..., min_length=1)):
    api_key = os.getenv("GROQ_API_KEY", "")
    
    if not api_key:
        raise HTTPException(status_code=500, detail="Groq API Key is missing in environment variables.")

    # 1. Fetch data from Groq API
    groq_url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    system_prompt = """You are a highly accurate medical API. The user will provide a skin condition or disease name.
You must return a JSON object containing the following exact keys:
- "condition_name": The standardized medical name.
- "category": The general category (e.g., "benign", "malignant", "inflammatory", "infectious", "autoimmune").
- "icd_code": The ICD-10 or ICD-11 code for this condition.
- "fitzpatrick_spectrum": Which Fitzpatrick skin types this commonly affects (e.g., "I-VI", "I-IV").
- "description": A concise but highly detailed clinical description of the condition.
Do not wrap the JSON in markdown code blocks. Output raw JSON only."""

    payload = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": q}
        ],
        "temperature": 0.1,
        "response_format": {"type": "json_object"}
    }
    
    try:
        response = requests.post(groq_url, headers=headers, json=payload, timeout=10)
        response.raise_for_status()
        result_text = response.json()['choices'][0]['message']['content']
        structured_data = json.loads(result_text)
    except Exception as e:
        logger.error(f"Groq API error: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch condition data from AI provider.")

    # 2. Fetch images from Wikipedia
    images = fetch_wikipedia_image(structured_data.get("condition_name", q))
    
    # If no images found for specific condition name, try the original query
    if not images and structured_data.get("condition_name", "").lower() != q.lower():
        images = fetch_wikipedia_image(q)

    # 3. Assemble and return
    condition_record = {
        "id": str(uuid.uuid4()),
        "condition_name": structured_data.get("condition_name", q.title()),
        "category": structured_data.get("category", "Unknown"),
        "icd_code": structured_data.get("icd_code", "N/A"),
        "fitzpatrick_spectrum": structured_data.get("fitzpatrick_spectrum", "N/A"),
        "description": structured_data.get("description", "No description available."),
        "images": images
    }
    
    return {"data": [condition_record]}

