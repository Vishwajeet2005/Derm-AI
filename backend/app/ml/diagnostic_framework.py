from sqlalchemy.orm import Session
from ..db.models import Condition
import os
import requests
import json
import logging

logger = logging.getLogger(__name__)

def fetch_ai_description(condition_name: str) -> str:
    api_key = os.getenv("GROQ_API_KEY", "")
    if not api_key:
        return f"A medical condition identified as {condition_name}. Consult a dermatologist for a professional evaluation."
        
    try:
        groq_url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        prompt = f"Provide a highly detailed, concise, and professional medical description (2-3 sentences) for the skin condition '{condition_name}'. Do not use formatting like bolding. Be direct."
        
        payload = {
            "model": "openai/gpt-oss-20b",
            "messages": [
                {"role": "system", "content": "You are a clinical dermatologist API."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.2
        }
        
        res = requests.post(groq_url, headers=headers, json=payload, timeout=5)
        if res.status_code == 200:
            return res.json()['choices'][0]['message']['content'].strip().replace('"', '')
    except Exception as e:
        logger.error(f"Failed to fetch AI description for {condition_name}: {e}")
        
    return f"A medical condition identified as {condition_name}. Consult a dermatologist for a professional evaluation."

def get_condition_details(db: Session, condition_name: str):
    \"\"\"
    Layer 1 — takes top_1_class string, returns condition details from the conditions table.
    \"\"\"
    condition = db.query(Condition).filter(Condition.condition_name == condition_name).first()
    
    if not condition:
        # Dynamic AI description generation instead of placeholder
        return {
            "condition_name": condition_name,
            "category": "benign" if "nevus" in condition_name.lower() or "benign" in condition_name.lower() else "potentially_malignant",
            "description": fetch_ai_description(condition_name),
            "tropical_flag": False
        }
    
    return {
        "condition_name": condition.condition_name,
        "category": condition.category,
        "description": condition.description,
        "tropical_flag": condition.tropical_flag
    }

def severity_assessment(confidence_score: float) -> str:
    \"\"\"
    Layer 2 — severity_assessment(confidence_score).
    \"\"\"
    if confidence_score > 0.85:
        return "mild"
    elif confidence_score > 0.65:
        return "moderate"
    else:
        return "severe"

def urgency_flag(condition_category: str) -> str:
    \"\"\"
    Layer 3 — urgency_flag(condition_category).
    \"\"\"
    cat = condition_category.lower()
    if cat == "malignant":
        return "immediate"
    elif cat == "potentially_malignant":
        return "priority"
    else:
        return "standard"
