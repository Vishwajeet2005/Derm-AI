from fastapi import APIRouter, Query, HTTPException
import os
import uuid
import requests
import json
import logging
import urllib.parse

router = APIRouter()
logger = logging.getLogger(__name__)

# Specialized Clinical Dermatology Search Synonyms
# Maps general disease terms to specific dermatological entity pages containing verified skin photography
DERM_SYNONYMS = {
    'mucinosis': ['Pretibial myxedema', 'Cutaneous mucinosis', 'Myxedema'],
    'folliculitis': ['Isolated folliculitis', 'Folliculitis'],
    'pityriasis rosea': ['Pityriasis rosea'],
    'sarcoidosis': ['Lupus pernio', 'Cutaneous sarcoidosis'],
    'eczema': ['Atopic dermatitis', 'Dermatitis'],
    'acne': ['Acne vulgaris'],
    'rosacea': ['Rosacea'],
    'vitiligo': ['Vitiligo'],
    'psoriasis': ['Psoriasis on back1', 'Psoriasis'],
    'melanoma': ['Melanoma'],
    'basal cell carcinoma': ['Basal-cell carcinoma', 'Basal cell carcinoma'],
    'squamous cell carcinoma': ['Squamous-cell skin cancer'],
    'lichen planus': ['Lichen planus'],
    'urticaria': ['Hives'],
    'scabies': ['Scabies'],
    'shingles': ['Herpes zoster'],
    'seborrheic keratosis': ['Seborrheic keratosis'],
    'actinic keratosis': ['Actinic keratosis']
}

def fetch_wikipedia_image(query: str):
    headers = {'User-Agent': 'DermAI-Bot/1.0 (contact@dermai.org)'}
    
    clean_q = query.lower().strip()
    candidate_terms = [query]
    
    # Check if we have specialized dermatology synonyms
    for k, syn_list in DERM_SYNONYMS.items():
        if k in clean_q or clean_q in k:
            candidate_terms = syn_list + candidate_terms
            break

    # 1. Try exact match on candidates
    for term in candidate_terms:
        try:
            url_exact = 'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&redirects=1&titles=' + urllib.parse.quote(term)
            res = requests.get(url_exact, headers=headers, timeout=4)
            pages = res.json().get('query', {}).get('pages', {})
            for _, p in pages.items():
                title = p.get('title', '').lower()
                if 'list of' in title or 'index of' in title:
                    continue
                if 'original' in p and p['original']['source']:
                    src = p['original']['source']
                    if not any(bad in src.lower() for bad in ['.svg', 'flag', 'symbol', 'icon', 'logo', 'x-ray', 'radiograph']):
                        return [src]
        except Exception:
            pass

    # 2. Try search generator fallback
    try:
        url_search = 'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=' + urllib.parse.quote(f"{query} cutaneous") + '&gsrlimit=3&prop=pageimages&format=json&piprop=original'
        res = requests.get(url_search, headers=headers, timeout=4)
        pages = res.json().get('query', {}).get('pages', {})
        for _, p in pages.items():
            title = p.get('title', '').lower()
            if 'list of' in title or 'index of' in title:
                continue
            if 'original' in p and p['original']['source']:
                src = p['original']['source']
                if not any(bad in src.lower() for bad in ['.svg', 'flag', 'symbol', 'icon', 'logo', 'x-ray', 'radiograph']):
                    return [src]
    except Exception as e:
        logger.error(f"Wikipedia search API error: {e}")
        
    return []

@router.get("")
async def search_disease(q: str = Query(..., min_length=1)):
    api_key = os.getenv("GROQ_API_KEY", "")
    
    if not api_key:
        raise HTTPException(status_code=500, detail="Groq API Key is missing in environment variables.")

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
- "overview": A concise but highly detailed clinical overview of the condition.
- "symptoms": An array of strings listing common symptoms.
- "causes": An array of strings listing primary causes or risk factors.
- "treatment": An array of strings listing common treatments or management strategies.
Do not wrap the JSON in markdown code blocks. Output raw JSON only."""

    payload = {
        "model": "openai/gpt-oss-20b",
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

    cond_name = structured_data.get("condition_name", q)
    images = fetch_wikipedia_image(cond_name)
    
    if not images and cond_name.lower() != q.lower():
        images = fetch_wikipedia_image(q)

    condition_record = {
        "id": str(uuid.uuid4()),
        "condition_name": structured_data.get("condition_name", q.title()),
        "category": structured_data.get("category", "Unknown"),
        "icd_code": structured_data.get("icd_code", "N/A"),
        "fitzpatrick_spectrum": structured_data.get("fitzpatrick_spectrum", "N/A"),
        "overview": structured_data.get("overview", "No overview available."),
        "symptoms": structured_data.get("symptoms", []),
        "causes": structured_data.get("causes", []),
        "treatment": structured_data.get("treatment", []),
        "images": images
    }

    return {"data": [condition_record]}
