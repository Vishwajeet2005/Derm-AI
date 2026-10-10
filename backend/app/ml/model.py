import os
import logging
import torch
import torchvision.models as models
from torchvision import transforms
from PIL import Image
import numpy as np
from ..core.config import settings

logger = logging.getLogger(__name__)

class DermAIModel:
    def __init__(self):
        self.model = None
        self.idx_to_class = {}
        self.transform = None
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self._load_model()

    def _load_model(self):
        model_path = os.path.join(os.path.dirname(__file__), 'saved_model', 'DermAI_Mega_Payload.pth')
        
        if os.path.exists(model_path):
            try:
                logger.info(f"Loading PyTorch model from {model_path} on {self.device}")
                checkpoint = torch.load(model_path, map_location=self.device, weights_only=False)
                
                self.idx_to_class = checkpoint['idx_to_class']
                num_classes = len(self.idx_to_class)
                img_size = checkpoint.get('image_size', 300)
                
                self.model = models.efficientnet_b3(weights=None)
                self.model.classifier[1] = torch.nn.Linear(self.model.classifier[1].in_features, num_classes)
                
                self.model.load_state_dict(checkpoint['model_state_dict'])
                self.model.to(self.device)
                self.model.eval()
                
                self.transform = transforms.Compose([
                    transforms.Resize((img_size, img_size)),
                    transforms.ToTensor(),
                    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
                ])
                
                logger.info(f"Successfully loaded EfficientNetB3 with {num_classes} classes.")
            except Exception as e:
                logger.error(f"Failed to load model: {e}")
                self.model = None
        else:
            logger.warning(f"Model not found at {model_path}. Using mock predictions.")
            self.model = None

    def predict(self, image_array):
        if self.model is not None:
            try:
                if not isinstance(image_array, Image.Image):
                    # Revert preprocessing done by preprocess.py
                    img_array_squeezed = np.squeeze(image_array)
                    if img_array_squeezed.dtype != np.uint8:
                        img_uint8 = (img_array_squeezed * 255).astype(np.uint8)
                    else:
                        img_uint8 = img_array_squeezed
                    image = Image.fromarray(img_uint8).convert('RGB')
                else:
                    image = image_array.convert('RGB')

                input_tensor = self.transform(image).unsqueeze(0).to(self.device)
                
                with torch.no_grad():
                    output = self.model(input_tensor)
                    probabilities = torch.nn.functional.softmax(output[0], dim=0)
                
                top3_prob, top3_indices = torch.topk(probabilities, 3)
                top3_prob = top3_prob.cpu().numpy()
                top3_indices = top3_indices.cpu().numpy()
                
                top_3 = []
                for i in range(3):
                    idx = top3_indices[i]
                    raw_name = self.idx_to_class[idx]
                    clean_name = raw_name.replace('fitz_', '').replace('ham_', '').replace('_', ' ').title()
                    top_3.append({
                        "class_name": clean_name,
                        "confidence": float(top3_prob[i])
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
