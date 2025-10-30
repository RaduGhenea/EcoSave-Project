from flask import Blueprint, request
from flask import jsonify
from flask.globals import session
from flask_jwt_extended.utils import current_user
from google.genai.types import SessionResumptionConfigOrDict
from sqlalchemy import func
from services.user_service import User, DailyScores
from extensions import bcrypt, jwt, db
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

user_bp = Blueprint("user_bp", __name__)


@user_bp.route('/test', methods=["POST"])
def test():
    print(request.form.get("email"))

    return jsonify({
        "id": "someid",
        "email": "somemail",
        "access_token": "somepwd"
    })

@user_bp.route('/verify', methods=["GET"])
@jwt_required()
def verify_user():
    id = get_jwt_identity()
    current_user = User.query.filter_by(id=id).first()
    if current_user is None:
        return jsonify({"error": "could not find user"})

    return jsonify(username=current_user.username, streak=current_user.streak)

@user_bp.route('/getuserdata', methods=["GET"])
@jwt_required()
def get_data():
    id = get_jwt_identity()
    current_user = User.query.filter_by(id=id).first()
    if current_user is None:
        return jsonify({"error": "could not find user"})
    user_daily = DailyScores.query.filter_by(user_id=id).first()
    if user_daily is None:
        return jsonify({"error": "could not get user daily stats"})


    user_rank = (
        db.session.query(func.count(DailyScores.id))
        .filter(DailyScores.score > user_daily.score).scalar()
    )+1
    print("cevaa")
    return jsonify(
        username=current_user.username,
        streak=current_user.streak,
        placement=user_rank
    )

@user_bp.route('/getleaderboard', methods=["GET"])
@jwt_required()
def get_leaderboard():
    leaderboard = db.session.query(
        User.username,
        DailyScores.score
    ).join(DailyScores, User.id == DailyScores.user_id).order_by(DailyScores.score.desc()).all()

    # print(leaderboard[0])
    dict_leaderboard = [{"name": user, "score": score} for user, score in leaderboard]
    return jsonify(leaderboard=dict_leaderboard)



@user_bp.route('/login', methods=["POST"])
def login_user():

    email = request.form.get("email")
    password = request.form.get("password")
    print(email)

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "unauthorized"}), 401

    user_daily = DailyScores.query.filter_by(user_id=user.id).first()
    if user_daily is None:
        new_daily = (DailyScores(user_id=user.id, score=250))
        db.session.add(new_daily)
        db.session.commit()

    token = create_access_token(identity=user.id)
    print(token)
    return jsonify({
        "username": user.username,
        "streak": user.streak,
        "access_token": token
    })

@user_bp.route('/register', methods=["POST"])
def register_user():

    username = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")

    user_exists = User.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({"error": "email already in use"}), 409
    name_is_taken = User.query.filter_by(username=username).first() is not None
    if name_is_taken:
        return jsonify({"error": "username is taken"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = (User(email=email, password=hashed_password, username=username))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })
