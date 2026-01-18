from flask_jwt_extended import exceptions
from google import genai
from google.api_core import exceptions as google_exceptions
import config

from transformers import AutoModel, AutoTokenizer, AutoProcessor, AutoModelForImageClassification
import torch
from PIL import Image
from torchvision import transforms, datasets
from pathlib import Path
import os

MODEL_PATH = 'prediction/model'
isExist = os.path.exists(MODEL_PATH)
print(isExist)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = AutoModelForImageClassification.from_pretrained(MODEL_PATH, torch_dtype=torch.float32)
model.to(device)
model.eval()

processor = AutoProcessor.from_pretrained(MODEL_PATH)

class_names = ['battery', 'biological', 'glass', 'cardboard', 'clothes', 'glass', 'metal', 'paper', 'plastic', 'shoes', 'trash', 'glass']

mean = processor.image_mean if hasattr(processor, "image_mean") else [0.485, 0.456, 0.406]
std = processor.image_std  if hasattr(processor, "image_std")  else [0.229, 0.224, 0.225]
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=mean, std=std)
])

def local_prediction(image):
    img_tensor = transform(image).unsqueeze(0)

    with torch.no_grad():
        logits = model(pixel_values=img_tensor).logits
        pred_idx = logits.argmax(dim=-1).item()
        pred_label = class_names[pred_idx]
        print("local prediction: ", pred_label)
        return pred_label


def predict(prompt: str, options, image):
    if config.AI_KEY is None:
        return local_prediction(image)

    client = genai.Client(api_key=config.AI_KEY)

    if client is None:
        return local_prediction(image)

    try:
        new_image = image.resize(config.target_size)
        response = client.models.generate_content(
            model="gemini-2.5-flash", contents=[prompt, options, new_image]
        )
        # print(response)
        print(response.candidates[0].content.parts[0].text)
        ans = response.candidates[0].content.parts[0].text
        if ans is not None:
            return ans
        else:
            return local_prediction(image)

    except google_exceptions.GoogleAPICallError as e:
        return local_prediction(image)
