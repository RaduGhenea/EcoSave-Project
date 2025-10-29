from uuid import uuid4
from extensions import db

class User(db.Model):
    __tablename__ = "Users"
    id = db.Column(db.String(32), primary_key=True, default=uuid4().hex)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
    username = db.Column(db.String(15), unique=True)
    streak = db.Column(db.Integer, default=0)