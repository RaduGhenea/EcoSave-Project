# Model Description

## Pretrained Base
The model uses the ResNet50 created by Microsoft model as a pretraied base.
This choice is inspired from another notebook found on kaggle under the same dataset:
[source of inspiration](https://www.kaggle.com/code/ayushpatel107/nndl-cs-inceptionv3)

## Layers
```
model = keras.Sequential([
    data_augmentation,
    pretrained_base,
    layers.GlobalAveragePooling2D(),
    layers.BatchNormalization(),
    layers.Dropout(0.4),

    layers.Dense(256, activation='relu'),
    layers.BatchNormalization(),
    layers.Dropout(0.3),

    layers.Dense(6, activation='softmax')  # 6 classes
])
```

### data_augmentation
Used as first layer to randomize rotation and zoom of images
