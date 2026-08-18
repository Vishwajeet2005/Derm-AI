def layer_1_condition_details(top_1_class: str, db_session) -> dict:
    """
    Layer 1 — takes top_1_class string, returns condition details from the conditions table.
    """
    from app.db.models import Condition
    condition = db_session.query(Condition).filter(Condition.condition_name == top_1_class).first()
    if condition:
        return {
            "description": condition.description,
            "category": condition.category
        }
    return {"description": "Standard diagnostic description.", "category": "general"}

def severity_assessment(confidence_score: float) -> str:
    """
    Layer 2 — severity_assessment(confidence_score)
    TODO: Replace with trained regression head.
    """
    if confidence_score > 0.85:
        return "mild"
    elif confidence_score > 0.65:
        return "moderate"
    return "severe"

def urgency_flag(condition_category: str) -> str:
    """
    Layer 3 — urgency_flag(condition_category)
    """
    if condition_category == "malignant":
        return "immediate"
    elif condition_category == "potentially_malignant":
        return "priority"
    return "standard"
