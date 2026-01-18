from prediction.predict import predict
from PIL import Image
import config
from typing import Any
import time

default_options = ['paper', 'glass', 'metal', 'carboard', 'organic', 'plastic']
prompt='tell me what type of trash there is in the given image. reply in one word or a series of relevant ones from the options given'

def check_image(image: Image.Image, options: list[str] | None = None):
    # image = image.resize(config.target_size)
    if options is None:
        options = default_options

    prediction = None
    if(config.TESTING==False):
        prediction = predict(prompt, options, image)
        # print("prediction:", prediction)
        # prediction = result.candidates[0].content.parts[0].text
    else:
        prediction = "Turned off for testing"
        time.sleep(0.5)
    # prediction = "turned off"
    prediction = prediction.capitalize()

    return prediction
