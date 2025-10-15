from tensorflow import keras
import os
model_path = '../machine_learning/models/resnet_82acc/garbage_classifier.keras'
model = keras.load_model(model_path)
