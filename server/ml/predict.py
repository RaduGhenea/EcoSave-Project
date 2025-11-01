from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
from model import model
import os

photos_dir = 'ml/test_photos/'

class_names = ["circle", "square", "star", "triangle"]
# class_names = ["other", "ellipse", "rectangle", "triangle"]
def get_name(x):
    return class_names[x]

def preprocess_image(image_path, target_size=(128, 128)):
    img = image.load_img(image_path, target_size=target_size)

    thresh = 80
    fn = lambda x : 255 if x > thresh else 0
    img = img.convert('L').point(fn, mode='1')
    img = img.convert('RGB')
    img.save('test.jpg')
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    return img_array

def predict_image(image_path):
    img_array = preprocess_image(image_path)
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions, axis=1)[0]
    confidence = np.max(predictions)
    print(predictions)
    print(get_name(predicted_class), confidence)

# predict_image('ml/test_photos/100.png')
predict_image('ml/test_photos/IMG_9086.JPG')

# for img in os.listdir(photos_dir):
#     if img != '.gitkeep':
#         print(img[:-4])
#         predict_image(photos_dir+img)
