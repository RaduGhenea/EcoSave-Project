from google_genai.predict import predict
from PIL import Image
import config
from typing import Any, List

default_options = ['paper', 'glass', 'metal', 'carboard', 'organic', 'plastic']
prompt='tell me what type of trash there is in the given image. reply in only one word from the options given'

def check_image(image: Image.Image, options: list[str] | None=None) -> str:
    image = image.resize(config.target_size)
    if options is None:
        options = default_options

    prediction = "glass"
    if(config.TESTING==False):
        result: Any = predict(prompt, options, image)
        prediction = result.candidates[0].content.parts[0].text

    # prediction = "turned off"
    prediction[0]=prediction[0].upper()
    if prediction: return prediction
    return "Could not get AI response"
