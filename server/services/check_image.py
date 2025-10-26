from google_genai.predict import predict
import config
from PIL import Image


default_options = ['paper', 'glass', 'metal', 'carboard', 'organic', 'plastic']
prompt='tell me what type of trash there is in the given image. reply in only one word from the options given'

def check_image(_image, options=[]):
    image = Image.open(_image)
    image.resize(config.target_size)
    if options == []:
        options = default_options

    prediction = predict(prompt, options, image, config.AI_KEY)
    return prediction.candidates[0].content.parts[0].text
