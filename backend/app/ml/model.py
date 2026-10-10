import os
import json
import logging
import numpy as np
from PIL import Image
from ..core.config import settings

logger = logging.getLogger(__name__)

class DermAIModel:
    def __init__(self):
        self.session = None
        self.idx_to_class = {}
        self._load_model()

    def _load_model(self):
        model_path = os.path.join(os.path.dirname(__file__), 'saved_model', 'dermai_model.onnx')
        mapping_path = os.path.join(os.path.dirname(__file__), 'saved_model', 'idx_to_class.json')
        
        if os.path.exists(model_path) and os.path.exists(mapping_path):
            try:
                import onnxruntime as ort
                
                # Load metadata
                with open(mapping_path, 'r') as f:
                    # keys in json are strings, convert to int
                    raw_mapping = json.load(f)
                    self.idx_to_class = {int(k): v for k, v in raw_mapping.items()}
                
                num_classes = len(self.idx_to_class)
                
                # Load ONNX session
                # Forcing CPU execution provider for cloud compatibility and low memory
                self.session = ort.InferenceSession(model_path, providers=['CPUExecutionProvider'])
                
                logger.info(f"Successfully loaded EfficientNetB3 ONNX model with {num_classes} classes.")
            except ImportError:
                logger.error("onnxruntime is not installed! Run: pip install onnxruntime")
                self.session = None
            except Exception as e:
                logger.error(f"Failed to load ONNX model: {e}")
                self.session = None
        else:
            logger.warning(f"Model or mapping not found at {model_path}. Using mock predictions.")
            self.session = None

    def _preprocess(self, image_array):
        # 1. Ensure PIL RGB Image
        if not isinstance(image_array, Image.Image):
            img_array_squeezed = np.squeeze(image_array)
            if img_array_squeezed.dtype != np.uint8:
                img_uint8 = (img_array_squeezed * 255).astype(np.uint8)
            else:
                img_uint8 = img_array_squeezed
            image = Image.fromarray(img_uint8).convert('RGB')
        else:
            image = image_array.convert('RGB')
            
        # 2. Resize
        image = image.resize((300, 300))
        
        # 3. To Numpy, scale to 0-1
        img_np = np.array(image).astype(np.float32) / 255.0
        
        # 4. Normalize (ImageNet stats)
        mean = np.array([0.485, 0.456, 0.406])
        std = np.array([0.229, 0.224, 0.225])
        img_np = (img_np - mean) / std
        
        # 5. Transpose to NCHW (channels first)
        img_np = np.transpose(img_np, (2, 0, 1))
        
        # 6. Add batch dimension
        img_np = np.expand_dims(img_np, axis=0).astype(np.float32)
        
        return img_np

    def predict(self, image_array):
        if self.session is not None:
            try:
                # Preprocess
                input_tensor = self._preprocess(image_array)
                
                # Inference
                input_name = self.session.get_inputs()[0].name
                outputs = self.session.run(None, {input_name: input_tensor})
                
                # Softmax
                logits = outputs[0][0]
                exp_logits = np.exp(logits - np.max(logits))
                probabilities = exp_logits / exp_logits.sum()
                
                # Get Top 3
                top3_indices = np.argsort(probabilities)[-3:][::-1]
                
                top_3 = []
                for idx in top3_indices:
                    raw_name = self.idx_to_class[idx]
                    clean_name = raw_name.replace('fitz_', '').replace('ham_', '').replace('_', ' ').title()
                    top_3.append({
                        "class_name": clean_name,
                        "confidence": float(probabilities[idx])
                    })
                    
                return {
                    "top_1_class": top_3[0]["class_name"],
                    "top_1_confidence": top_3[0]["confidence"],
                    "top_3_list": top_3
                }
            except Exception as e:
                logger.error(f"Prediction error: {e}")
                raise e
        else:
            return {
                "top_1_class": "Model Not Loaded",
                "top_1_confidence": 0.99,
                "top_3_list": [
                    {"class_name": "Model Not Loaded", "confidence": 0.99},
                    {"class_name": "Mock Class 2", "confidence": 0.01},
                    {"class_name": "Mock Class 3", "confidence": 0.00}
                ]
            }

model_instance = DermAIModel()

def predict(image_array):
    return model_instance.predict(image_array)

