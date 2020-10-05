import tensorflow.keras
from PIL import Image, ImageOps
import numpy as np

np.set_printoptions(suppress=True)

model = tensorflow.keras.models.load_model('keras_model.h5')

data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

def pre(src):
    image = Image.open(src)

    size = (224, 224)
    print(image.size)
    image = ImageOps.fit(image, size, Image.ANTIALIAS)

   
    image_array = np.array(image)
    print(image_array.shape)
    image_array=image_array[...,:3]

    print(image_array.shape)

    normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1

    data[0] = normalized_image_array

    prediction = list(model.predict(data)[0])
    print((prediction[1]))
    return prediction

pre('per.png')