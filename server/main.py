import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
import config
from services.check_image import check_image
from services.user_service import DailyScores, User, system_state
from routes.user_routes import user_bp
from PIL import Image
from extensions import bcrypt, db, jwt
import time
from flask_jwt_extended import (verify_jwt_in_request, get_jwt_identity)
from flask_jwt_extended.exceptions import NoAuthorizationError, InvalidHeaderError
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)
app.config.from_object(config.app_config)
app.register_blueprint(user_bp)

bcrypt.init_app(app)
db.init_app(app)
jwt.init_app(app)

scheduler = BackgroundScheduler()

cors=CORS(
    app, origins=["http://localhost:5173", "https://ecosave-project.onrender.com"],
    supports_credentials=True,           # allow Authorization or cookies
    methods=["GET", "POST", "OPTIONS"],  # allow GET and OPTIONS
    allow_headers=["Content-Type", "Authorization"]
)

with app.app_context():
    db.create_all()

def daily_cleanup():
    with app.app_context():
        daily = DailyScores.query.all()
        for obj in daily:
            obj.recycled = False
            obj.score=0
        db.session.commit()

scheduler.add_job(
    func=daily_cleanup,
    trigger='cron',
    hour=0,
    minute=0,
)


def on_startup():
    print("🔥 Server is starting up...")

    with app.app_context():
        daily_cleanup()
        system_data = system_state.query.first()
        scheduler.start()
        if not system_data:
            system_data = system_state(last_wipe = datetime.date.today())
            db.session.add(system_data)
            db.session.commit()
        if(datetime.date.today().day > system_data.last_wipe.day):
            daily_cleanup()

    print(system_data.last_wipe.day)


    print("✅ Initialization complete.")


@app.route('/upload-image', methods=['POST'])
def upload_image():
    image = request.files['image']
    response = check_image(Image.open(image))
    if response is None:
        response = "could not get Ai response"
        return jsonify(response), 404

    try:
        # Try verifying the token manually
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        logged_in = True
    except (NoAuthorizationError, InvalidHeaderError):
        print("nelogat")
        user_id = None
        logged_in = False

    streak_changed=False
    if logged_in:
        user_daily = DailyScores.query.filter_by(user_id=user_id).first()
        print(user_daily.recycled)
        user_daily.score+=1
        if not user_daily.recycled:
            user = User.query.filter_by(id=user_id).first()
            user.streak = user.streak+1
            user_daily.recycled=True
            streak_changed=True
        db.session.commit()

    return jsonify(response=response, streakchanged=streak_changed)


if __name__ == "__main__":
    on_startup()
    app.run(debug=True, port=3000)
