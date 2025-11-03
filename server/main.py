from flask import Flask, jsonify, request
from flask_cors import CORS
import config
from services.check_image import check_image
from routes.user_routes import user_bp
from PIL import Image
from extensions import bcrypt, db, jwt
import time

app = Flask(__name__)
app.config.from_object(config.app_config)
app.register_blueprint(user_bp)

bcrypt.init_app(app)
db.init_app(app)
jwt.init_app(app)

cors=CORS(
    app, origins=["http://localhost:5173"],
    supports_credentials=True,           # allow Authorization or cookies
    methods=["GET", "POST", "OPTIONS"],  # allow GET and OPTIONS
    allow_headers=["Content-Type", "Authorization"]
)

with app.app_context():
    db.create_all()

@app.route('/upload-image', methods=['POST'])
def upload_image():
    image = request.files['image']
    response = check_image(Image.open(image))
    if response is None:
        response = "could not get Ai response"
    return jsonify(response), 404

if __name__ == "__main__":
    app.run(debug=True, port=3000)