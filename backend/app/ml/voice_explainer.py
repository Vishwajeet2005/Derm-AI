def generate_explanation(diagnosis: str, severity: str, urgency: str, description: str, confidence: float = 1.0) -> str:
    """
    Takes diagnosis, severity, urgency, condition description, and confidence as inputs.
    Builds a structured explanation string with clinical accuracy and quality notes.
    """
    urgency_recommendation = {
        "immediate": "Due to the critical nature of this condition, we strongly advise scheduling an immediate consultation with a certified dermatologist.",
        "priority": "We recommend consulting a dermatologist soon for a confirmatory in-person examination.",
        "standard": "Routine clinical observation and appropriate skincare is advised. Consult a doctor if you experience persistent discomfort, bleeding, or rapid growth."
    }.get(urgency.lower(), "Consult a dermatologist for a professional evaluation.")
    
    explanation = (
        f"Based on visual analysis, the primary indication is {diagnosis} with a {severity} clinical severity profile. "
        f"{urgency_recommendation} "
        f"\n\nAbout this condition: {description}"
    )
    
    if confidence < 0.50:
        pct = int(confidence * 100)
        explanation += (
            f"\n\nPhoto Quality Note: Diagnostic certainty is {pct}%. "
            "This can occur if the photo is taken from a distance, is out of focus, or contains background objects. "
            "For the highest precision, ensure future scans are well-lit, close-up photos focused directly on the skin lesion."
        )
        
    return explanation
