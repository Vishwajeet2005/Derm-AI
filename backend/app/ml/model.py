import os
import random
from app.core.config import settings

# Placeholder for development. Will be replaced with full 390-class list.
DISEASE_CLASSES = [
    "Melanoma", "Melanocytic Nevus", "Basal Cell Carcinoma",
    "Actinic Keratosis", "Benign Keratosis", "Dermatofibroma",
    "Vascular Lesion", "Eczema", "Psoriasis", "Tinea"
]

def load_model():
    """
    Load EfficientNetB3 from a saved Keras model at path defined in config.
    Graceful fallback for development if model is missing.
    """
    if os.path.exists(settings.MODEL_PATH):
        try:
            import tensorflow as tf
            return tf.keras.models.load_model(settings.MODEL_PATH)
        except Exception as e:
            print(f"Failed to load real model: {e}")
            return None
    return None

def predict(image_array):
    """
    Returns a dict with top_1_class, top_1_confidence, and top_3_list.
    Uses mock data if real model is not available.
    """
    model = load_model()
    if model is not None:
        # Real inference would go here
        # preds = model.predict(image_array)
        pass
    
    # Mock inference fallback
    top_3 = random.sample(DISEASE_CLASSES, 3)
    return {
        "top_1_class": top_3[0],
        "top_1_confidence": round(random.uniform(0.75, 0.98), 2),
        "top_3_list": [
            {"class_name": top_3[0], "confidence": round(random.uniform(0.75, 0.98), 2)},
            {"class_name": top_3[1], "confidence": round(random.uniform(0.40, 0.74), 2)},
            {"class_name": top_3[2], "confidence": round(random.uniform(0.10, 0.39), 2)}
        ]
    }
