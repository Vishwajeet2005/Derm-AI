import numpy as np
from PIL import Image
import io

def _calculate_edge_density(image: Image.Image) -> float:
    """
    Computes high-frequency spatial gradient across a normalized 300x300 grayscale canvas.
    Digital screenshots, text posters, memes, and UI graphics exhibit harsh borders (> 8.5)
    whereas organic human skin tissue has smooth biological transitions (< 5.0).
    """
    gray = np.array(image.convert("L").resize((300, 300), Image.BILINEAR)).astype(np.float32)
    gx = np.abs(gray[:, 1:] - gray[:, :-1])
    gy = np.abs(gray[1:, :] - gray[:-1, :])
    return float((np.mean(gx) + np.mean(gy)) / 2.0)

def _calculate_max_skin_component(skin_mask_bool: np.ndarray) -> float:
    """
    Computes the size ratio of the single largest contiguous skin patch.
    Clinical skin photography has a continuous anatomical surface covering the frame.
    In contrast, non-clinical graphics with scattered brown/copper pixels (e.g. coins,
    circuits, wood grain, or icons) have disconnected micro-patches with max component < 0.14.
    """
    small = np.array(Image.fromarray((skin_mask_bool * 255).astype(np.uint8)).resize((60, 60), Image.NEAREST)) > 128
    h, w = small.shape
    visited = np.zeros((h, w), dtype=bool)
    max_count = 0
    total = h * w
    
    for r in range(h):
        for c in range(w):
            if small[r, c] and not visited[r, c]:
                count = 0
                q = [(r, c)]
                visited[r, c] = True
                while q:
                    cr, cc = q.pop()
                    count += 1
                    for nr, nc in ((cr - 1, cc), (cr + 1, cc), (cr, cc - 1), (cr, cc + 1)):
                        if 0 <= nr < h and 0 <= nc < w and small[nr, nc] and not visited[nr, nc]:
                            visited[nr, nc] = True
                            q.append((nr, nc))
                if count > max_count:
                    max_count = count
    return float(max_count / float(total))

def check_dermatological_image(image_bytes: bytes) -> tuple[bool, str, float]:
    """
    Validates whether the uploaded file is a genuine clinical photograph containing human skin.
    Rejects digital graphics, screenshots, text posters, dark gaming thumbnails, and non-skin objects.
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

    # 1. Blank or zero-contrast check
    if np.std(arr) < 6.0:
        return False, "Not an appropriate image. The photograph is blank or has insufficient contrast. Please upload a clear photo of the skin concern.", 0.0

    # 2. Lighting & underexposure check (rejects dark gaming/crypto screenshots or night photos)
    hsv = np.array(image.convert("HSV")).astype(np.float32)
    v_chan = hsv[:, :, 2]
    mean_v = float(np.mean(v_chan))
    dark_ratio = float(np.mean(v_chan < 30))
    if mean_v < 65.0 and dark_ratio > 0.20:
        return False, "Not an appropriate image. The photograph is too dark or contains excessive dark non-skin background. Please upload a clearly illuminated photograph of the skin concern.", 0.0

    # 3. High-frequency digital edge gradient check (detects text memes, UI graphics, YouTube thumbnails, vector art)
    edge_density = _calculate_edge_density(image)
    if edge_density > 8.5:
        return False, "Not an appropriate image. The uploaded file appears to be a digital graphic, screenshot, or text poster rather than a clinical photograph of human skin.", 0.0

    # 4. Multi-ethnic skin pixel mask covering Fitzpatrick phototypes I through VI
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    cb = 128.0 - 0.168736 * r - 0.331264 * g + 0.5 * b
    cr = 128.0 + 0.5 * r - 0.418688 * g - 0.081312 * b

    rgb_rule = (r > 35) & (g > 20) & (b > 15) & (r > g) & (r > b) & (np.abs(r - g) > 4)
    ycbcr_rule = (cb >= 65) & (cb <= 145) & (cr >= 123) & (cr <= 200)
    skin_mask = rgb_rule & ycbcr_rule
    skin_ratio = float(np.mean(skin_mask))

    if skin_ratio < 0.14:
        return (
            False,
            "Not an appropriate image. The uploaded photograph does not appear to show skin or a dermatological condition. Please upload a clear, focused photograph of the affected skin area.",
            skin_ratio
        )

    # 5. Contiguous biological skin region check
    max_comp_ratio = _calculate_max_skin_component(skin_mask)
    if max_comp_ratio < 0.14:
        return (
            False,
            "Not an appropriate image. No contiguous human skin surface was detected. Please upload a focused close-up photograph centered directly on the skin lesion.",
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
