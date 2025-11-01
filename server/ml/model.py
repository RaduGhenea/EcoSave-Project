from tensorflow import keras
import os
models_dir = 'ml/models/'

model1 = "shapes.model.01.h5"
model1 = "shapes.model.01.h5"

model_path = (models_dir+"model.h5")

try:
    model = keras.models.load_model(model_path)
except ValueError:
    raise ValueError("could not load model")