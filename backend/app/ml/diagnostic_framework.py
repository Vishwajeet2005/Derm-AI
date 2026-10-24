from sqlalchemy.orm import Session
from ..db.models import Condition
import os
import requests
import json
import logging

logger = logging.getLogger(__name__)

# Medical Risk Classification Taxonomy for 121 Classes
MALIGNANT_CONDITIONS = {
    'melanoma', 'malignant_melanoma', 'superficial_spreading_melanoma', 
    'basal_cell_carcinoma', 'squamous_cell_carcinoma', 'kaposi_sarcoma', 
    'mycosis_fungoides', 'lentigo_maligna', 'solid_cystic_basal_cell_carcinoma',
    'stevens_johnson_syndrome', 'carcinoma', 'sarcoma'
}

POTENTIALLY_MALIGNANT_CONDITIONS = {
    'actinic_keratosis', 'disseminated_actinic_porokeratosis', 
    'porokeratosis_actinic', 'xeroderma_pigmentosum', 'akiec', 'atypical_nevus',
    'dysplastic_nevus'
}

BENIGN_MILD_CONDITIONS = {
    'acne', 'acne_vulgaris', 'folliculitis', 'milia', 'fordyce_spots', 
    'keratosis_pilaris', 'seborrheic_keratosis', 'dermatofibroma', 'halo_nevus', 
    'congenital_nevus', 'becker_nevus', 'striae', 'port_wine_stain', 'sun_damaged_skin', 
    'syringoma', 'telangiectases', 'vitiligo', 'nevocytic_nevus', 'nevus', 'comedonicus',
    'freckle', 'lentigo', 'papilloma', 'cheilitis', 'fordyce'
}

CHRONIC_INFLAMMATORY_CONDITIONS = {
    'psoriasis', 'pustular_psoriasis', 'eczema', 'dyshidrotic_eczema', 
    'allergic_contact_dermatitis', 'lichen_planus', 'lichen_simplex', 
    'lupus_erythematosus', 'lupus_subacute', 'dermatomyositis', 'scleroderma',
    'pityriasis_rosea', 'pityriasis_rubra_pilaris', 'urticaria', 'sarcoidosis',
    'mucinosis', 'hidradenitis', 'rosacea', 'granuloma_annulare', 'scabies',
    'lyme_disease', 'erythema_multiforme', 'erythema_nodosum', 'perioral_dermatitis',
    'paronychia', 'tick_bite', 'myiasis', 'tungiasis', 'granuloma_pyogenic',
    'pyogenic_granuloma', 'ichthyosis_vulgaris', 'dariers_disease'
}

def classify_medical_nature(condition_name: str):
    """
    Returns (category, base_severity, urgency) based on condition pathology.
    """
    norm = condition_name.lower().replace('fitz_', '').replace('ham_', '').replace(' ', '_').replace('-', '_')

    # 1. Malignant / Emergency
    if any(m in norm for m in MALIGNANT_CONDITIONS):
        return ("malignant", "severe", "immediate")

    # 2. Pre-malignant / High concern
    if any(p in norm for p in POTENTIALLY_MALIGNANT_CONDITIONS):
        return ("potentially_malignant", "moderate", "priority")

    # 3. Benign / Superficial / Mild
    if any(b in norm for b in BENIGN_MILD_CONDITIONS):
        return ("benign", "mild", "standard")

    # 4. Inflammatory / Chronic
    if any(i in norm for i in CHRONIC_INFLAMMATORY_CONDITIONS):
        return ("inflammatory", "moderate", "standard")

    # Default fallback for other non-malignant skin conditions
    return ("standard", "moderate", "standard")

def fetch_ai_description(condition_name: str) -> str:
    api_key = os.getenv("GROQ_API_KEY", "")
    if not api_key:
        return f"A dermatological condition identified as {condition_name}. Consult a healthcare professional or dermatologist for personalized clinical evaluation."
        
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
        
    return f"A dermatological condition identified as {condition_name}. Consult a healthcare professional or dermatologist for personalized clinical evaluation."

def get_condition_details(db: Session, condition_name: str):
    """
    Returns condition metadata, ensuring medically accurate categorization.
    """
    condition = db.query(Condition).filter(Condition.condition_name.ilike(condition_name)).first()
    category, base_sev, urgency = classify_medical_nature(condition_name)
    
    if not condition:
        return {
            "condition_name": condition_name,
            "category": category,
            "description": fetch_ai_description(condition_name),
            "tropical_flag": False
        }
    
    return {
        "condition_name": condition.condition_name,
        "category": category if condition.category == "potentially_malignant" else condition.category,
        "description": condition.description,
        "tropical_flag": condition.tropical_flag
    }

def severity_assessment(condition_name: str, confidence_score: float = 0.5) -> str:
    """
    Clinically accurate severity assessment based on the condition's pathology,
    not merely whether confidence is low.
    """
    category, base_sev, urgency = classify_medical_nature(condition_name)
    return base_sev

def urgency_flag(condition_category: str) -> str:
    """
    Determines triage urgency based on the medical category.
    """
    cat = condition_category.lower()
    if cat == "malignant":
        return "immediate"
    elif cat in ("potentially_malignant", "priority"):
        return "priority"
    else:
        return "standard"
