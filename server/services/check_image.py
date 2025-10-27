from google_genai.predict import predict
from PIL import Image
import config


default_options = ['paper', 'glass', 'metal', 'carboard', 'organic', 'plastic']
prompt='tell me what type of trash there is in the given image. reply in only one word from the options given'

def check_image(image: Image, options=[]) -> str:
    if not image:
        return
    image.resize(config.target_size)
    if options == []:
        options = default_options

    # prediction = predict(prompt, options, image).candidates[0].content.parts[0].text
    prediction = "turned off"
    if len(prediction)==0:
        return "Error: Could not get AI response"
    else:
        return prediction
