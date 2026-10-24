import numpy as np
from PIL import Image
import io

def check_dermatological_image(image_bytes: bytes) -> tuple[bool, str, float]:
    """
    Validates whether the uploaded file is a valid photograph containing human skin.
    Uses multi-ethnic chrominance and illumination bounds in RGB and YCbCr color spaces
    covering Fitzpatrick phototypes I through VI, including erythematous and lesion states.
    Returns:
        is_valid (bool): True if image contains plausible skin area.
        message (str): Explanatory reason if rejected.
        skin_ratio (float): Ratio of skin-classified pixels.
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
        if image.mode != "RGB":
            image = image.convert("RGB")
    except Exception:
        return False, "Not an appropriate image. Please upload a valid JPG, PNG, or WEBP image file.", 0.0

    arr = np.array(image).astype(np.float32)
    if arr.ndim != 3 or arr.shape[2] != 3:
        return False, "Not an appropriate image. The uploaded file is not a valid color photograph.", 0.0

    # Reject completely solid / blank images with near-zero contrast variance
    if np.std(arr) < 6.0:
        return False, "Not an appropriate image. The photograph is blank or has insufficient contrast. Please upload a clear photo of the skin concern.", 0.0

    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    
    # YCbCr chrominance transformation
    cb = 128.0 - 0.168736 * r - 0.331264 * g + 0.5 * b
    cr = 128.0 + 0.5 * r - 0.418688 * g - 0.081312 * b

    # Multi-ethnic skin pixel mask covering Fitzpatrick phototypes I through VI:
    # 1. Illumination & hemoglobin dominance (R > G, R > B with minimal distance)
    rgb_rule = (r > 35) & (g > 20) & (b > 15) & (r > g) & (r > b) & (np.abs(r - g) > 4)
    # 2. Chrominance envelope for human skin and inflammatory erythema
    ycbcr_rule = (cb >= 65) & (cb <= 145) & (cr >= 123) & (cr <= 200)
    
    skin_mask = rgb_rule & ycbcr_rule
    skin_ratio = float(np.mean(skin_mask))

    # Real dermatological photos contain at least 12% skin pixels
    if skin_ratio < 0.12:
        return (
            False,
            "Not an appropriate image. The uploaded photograph does not appear to show skin or a dermatological condition. Please upload a clear, focused photograph of the affected skin area.",
            skin_ratio
        )

    return True, "", skin_ratio


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
