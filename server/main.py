from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from services.check_image import check_image
from PIL import Image


app = Flask(__name__)
cors=CORS(app, origins="*")

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/upload-image', methods=['POST'])
def upload_image():
    image = request.files['image']
    return jsonify(check_image(Image.open(image)))

if __name__ == "__main__":
    app.run(debug=True, port=3000)