from dotenv import load_dotenv
import os
from datetime import timedelta

load_dotenv()

AI_KEY=os.getenv('GOOGLE_GENAI_KEY')
TESTING = True
target_size=(224, 224)

class app_config():
    SQLALCHEMY_TRACK_CONFIGURATIONS = False
    # SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = fr"sqlite:///{os.getenv('DATABASE_PATH')}"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=30)
    JWT_SECRET_KEY=os.getenv('JWT_SECRET_KEY')