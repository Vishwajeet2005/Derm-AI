import numpy as np
from PIL import Image
import io

def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """
    Accepts a PIL Image or bytes input. 
    Resizes to 300x300. 
    Normalizes pixel values to 0-1. 
    Returns numpy array of shape (1, 300, 300, 3).
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
        if image.mode != "RGB":
            image = image.convert("RGB")
        image = image.resize((300, 300))
        img_array = np.array(image)
        # Normalize to 0-1
        img_array = img_array.astype("float32") / 255.0
        # Expand dims to (1, 300, 300, 3)
        img_array = np.expand_dims(img_array, axis=0)
        return img_array
    except Exception as e:
        raise ValueError(f"Image preprocessing failed: {e}")
