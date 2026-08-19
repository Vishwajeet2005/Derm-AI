import os
import random
import logging
from ..core.config import settings

logger = logging.getLogger(__name__)

# Note: This list will be replaced with the full 390-class list when the trained model is available.
DISEASE_CLASSES = [
    "Melanoma",
    "Melanocytic nevus",
    "Basal cell carcinoma",
    "Actinic keratosis",
    "Benign keratosis",
    "Dermatofibroma",
    "Vascular lesion",
    "Squamous cell carcinoma",
    "Eczema",
    "Psoriasis"
]

class DermAIModel:
    def __init__(self):
        self.model = None
        self._load_model()

    def _load_model(self):
        if os.path.exists(settings.MODEL_PATH):
            try:
                import tensorflow as tf
                self.model = tf.keras.models.load_model(settings.MODEL_PATH)
                logger.info(f"Successfully loaded EfficientNetB3 model from {settings.MODEL_PATH}")
            except Exception as e:
                logger.error(f"Failed to load model: {e}")
                self.model = None
        else:
            logger.warning(f"Model not found at {settings.MODEL_PATH}. Using mock predictions for development.")
            self.model = None

    def predict(self, image_array):
        """
        Returns a dict with top_1_class, top_1_confidence, and top_3_list.
        """
        if self.model is not None:
            # Perform actual inference
            preds = self.model.predict(image_array)[0]
            top_3_indices = preds.argsort()[-3:][::-1]
            top_3 = [
                {"class_name": DISEASE_CLASSES[i], "confidence": float(preds[i])}
                for i in top_3_indices
            ]
            return {
                "top_1_class": top_3[0]["class_name"],
                "top_1_confidence": top_3[0]["confidence"],
                "top_3_list": top_3
            }
        else:
            # Mock fallback for development
            mock_classes = random.sample(DISEASE_CLASSES, 3)
            confidences = [round(random.uniform(0.7, 0.98), 2), round(random.uniform(0.1, 0.25), 2), round(random.uniform(0.01, 0.1), 2)]
            top_3 = [
                {"class_name": mock_classes[i], "confidence": confidences[i]}
                for i in range(3)
            ]
            return {
                "top_1_class": top_3[0]["class_name"],
                "top_1_confidence": top_3[0]["confidence"],
                "top_3_list": top_3
            }

model_instance = DermAIModel()

def predict(image_array):
    """Module-level predict function that delegates to the singleton model instance."""
    return model_instance.predict(image_array)
