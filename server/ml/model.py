from tensorflow import keras
import os
models_dir = 'ml/models/'
model_path = (models_dir+"best_model.keras")

try:
    model = keras.models.load_model(model_path)
except ValueError:
    raise ValueError("could not load model")