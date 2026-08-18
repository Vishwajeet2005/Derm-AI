def generate_explanation(diagnosis: str, severity: str, urgency: str, description: str) -> str:
    """
    Takes diagnosis, severity, urgency, condition description as inputs. 
    Builds a structured explanation string using a template. 
    """
    # TODO: Multilingual translation and TTS synthesis will be integrated in Phase 4.
    
    explanation = (
        f"Based on the analysis, the condition is most likely {diagnosis}. "
        f"The AI model indicates a {severity} severity level. "
        f"Because of this, the recommended action is categorized as {urgency}. "
        f"\n\nDetails: {description}"
    )
    
    return explanation
