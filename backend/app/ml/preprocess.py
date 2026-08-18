import numpy as np
from PIL import Image
import io

def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """
    Accept a PIL Image or bytes input. Resize to 300x300. 
    Normalize pixel values to 0-1. Return numpy array of shape (1, 300, 300, 3).
    """
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image = image.resize((300, 300))
    img_array = np.array(image) / 255.0
    return np.expand_dims(img_array, axis=0)
