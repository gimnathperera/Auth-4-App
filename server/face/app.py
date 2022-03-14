from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from flask_cors import CORS

from mtcnn.mtcnn import MTCNN
import cv2
import numpy as np
from keras_vggface.utils import preprocess_input
from scipy.spatial.distance import cosine
from keras_vggface.vggface import VGGFace

from PIL import Image

APP_ROOT = os.path.abspath(os.path.dirname(__file__))

# Init app
app = Flask(__name__)
CORS(app)

detector = MTCNN()


# Draw rectangle on detected face
def draw_face_box(image):
    faces = detector.detect_faces(image)
    x, y, width, height = faces[0]['box']

    cv2.rectangle(image,
                  (x, y,
                   width, height),
                  (0, 155, 155),
                  2)
    return image


# Extract face from a person
def extract_face(image, resize=(224, 224)):
    image = cv2.imread(image)
    faces = detector.detect_faces(image)
    x1, y1, width, height = faces[0]['box']
    x2, y2 = x1 + width, y1 + height

    face_boundary = image[y1:y2, x1:x2]
    face_image = cv2.resize(face_boundary, resize)

    return face_image


# Extract features from the detected face
def get_embedding(faces):
    face = np.asarray(faces, 'float32')

    # Preprocessing the image
    face = preprocess_input(face, version=2)

    # Adding transfer learning
    model = VGGFace(model='resnet50', include_top=False, input_shape=(224, 224, 3), pooling='avg')

    # Predict the image and return the prediction
    return model.predict(face)


# Get similarity between provided 2 images
def get_similarity(faces):
    embeddings = get_embedding(faces)

    score = cosine(embeddings[0], embeddings[1])
    if score <= 0.5:
        return {
            "prediction": "Face Matched",
            "probability": str(score)
        }
    return {
        "prediction": "Face Not Matched",
        "probability": str(score)
    }


# Verify face
def verify_face(old_image, new_image):
    match_face_list = [old_image, new_image]
    match_face_set = [extract_face(image) for image in match_face_list]

    return get_similarity(match_face_set)


@app.route('/api/verify-face', methods=['POST'])
def detect_user():
    target = os.path.join(APP_ROOT, 'temp/')

    if not os.path.isdir(target):
        os.mkdir(target)

    user_id = request.form['user_id']
    file = request.files.get('file')

    filename = file.filename
    destination = '/'.join([target, filename])

    file.save(destination)

    old_image_path = 'images/' + user_id + '.jpg'
    new_image_path = 'temp/' + filename

    result = verify_face(old_image_path, new_image_path)

    return jsonify(result)


@app.route('/api/store-face', methods=['POST'])
def store_image():
    target = os.path.join(APP_ROOT, 'images/')

    if not os.path.isdir(target):
        os.mkdir(target)

    file = request.files.get('file')
    filename = file.filename
    destination = '/'.join([target, filename])

    file.save(destination)

    return jsonify({
        "message": "Image saved successfully",
        "status": str('success')
    })


# Run Server
if __name__ == '__main__':
    app.run(host="192.168.1.101", port=5000)
