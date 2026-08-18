from sqlalchemy.orm import Session
from ..db.models import Condition

def get_condition_details(db: Session, condition_name: str):
    """
    Layer 1 — takes top_1_class string, returns condition details from the conditions table.
    """
    # For now, we mock the lookup if it doesn't exist in the DB during development.
    # In production, we query the conditions table.
    condition = db.query(Condition).filter(Condition.condition_name == condition_name).first()
    
    if not condition:
        # Mock condition for dev
        return {
            "condition_name": condition_name,
            "category": "benign" if "nevus" in condition_name.lower() or "benign" in condition_name.lower() else "potentially_malignant",
            "description": f"This is a placeholder description for {condition_name}.",
            "tropical_flag": False
        }
    
    return {
        "condition_name": condition.condition_name,
        "category": condition.category,
        "description": condition.description,
        "tropical_flag": condition.tropical_flag
    }

def severity_assessment(confidence_score: float) -> str:
    """
    Layer 2 — severity_assessment(confidence_score).
    Note: This will be replaced with the trained regression head.
    """
    if confidence_score > 0.85:
        return "mild"
    elif confidence_score > 0.65:
        return "moderate"
    else:
        return "severe"

def urgency_flag(condition_category: str) -> str:
    """
    Layer 3 — urgency_flag(condition_category).
    """
    cat = condition_category.lower()
    if cat == "malignant":
        return "immediate"
    elif cat == "potentially_malignant":
        return "priority"
    else:
        return "standard"
