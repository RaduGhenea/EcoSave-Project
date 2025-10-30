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
    SQLALCHEMY_DATABASE_URI = r"sqlite:////Users/radu/dev/web/EcoSave-Project/server/users_database/database.db"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=30)
    JWT_SECRET_KEY=os.getenv('JWT_SECRET_KEY')