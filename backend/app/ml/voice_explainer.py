def generate_explanation(diagnosis: str, severity: str, urgency: str, description: str) -> str:
    """
    Builds a structured explanation string using a template.
    TODO: Multilingual translation and TTS synthesis will be integrated in Phase 4.
    """
    explanation = (
        f"The AI analysis indicates a high probability of {diagnosis}. "
        f"Based on visual indicators, the severity appears to be {severity}. "
        f"This is classified as a {urgency} priority condition. "
        f"Additional context: {description}"
    )
    return explanation
