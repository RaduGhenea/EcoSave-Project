import datetime
from uuid import uuid4
from extensions import db

class User(db.Model):
    __tablename__ = "Users"
    id = db.Column(db.String(32), primary_key=True, default=uuid4().hex)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
    username = db.Column(db.String(15), unique=True)
    streak = db.Column(db.Integer, default=0)

class DailyScores(db.Model):
    __tablename__ = "Daily"
    id = db.Column(db.String(32), primary_key=True, default=uuid4().hex)
    user_id = db.Column(db.String(32), db.ForeignKey('Users.id'), nullable=False)
    score = db.Column(db.Integer, default=0)
    recycled = db.Column(db.Boolean, default=False)

class system_state(db.Model):
    __tablename__ = "system_state"
    id = db.Column(db.String(32), primary_key=True, default=uuid4().hex)
    last_wipe = db.Column(db.DateTime, default=datetime.date.today())



