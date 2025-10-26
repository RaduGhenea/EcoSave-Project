from google_genai.predict import predict
from PIL import Image
import config

img_path = '/Users/radu/dev/web/EcoSave-Project/server/ml/test_photos/glass1.jpg'
image = Image.open(img_path)
options = ['paper', 'glass', 'metal', 'carboard', 'organic', 'plastic']
prompt='tell me what type of trash there is in the given image. reply in only one word from the options given'

resp = predict(prompt, options, image, config.key)
print(resp.candidates[0].content.parts[0].text)


# with open('testing/response.json', 'w') as f:
    # f.write(json.dumps(resp))
    # json.dump(resp, f)