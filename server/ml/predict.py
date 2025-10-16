from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
from model import model
import os

photos_dir = 'ml/test_photos/'


class_names=['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']
def classid_to_name(id):
    return class_names[id]

def preprocess_image(image_path, target_size=(128, 128)):
    img = image.load_img(image_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    return img_array

def predict_image(image_path):
    img_array = preprocess_image(image_path)
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions, axis=1)[0]
    confidence = np.max(predictions)
    print(classid_to_name(predicted_class), confidence)


for img in os.listdir(photos_dir):
    predict_image(photos_dir+img)
