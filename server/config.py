from dotenv import load_dotenv
import os

load_dotenv()

AI_KEY=os.getenv('GOOGLE_GENAI_KEY')
target_size=(224, 224)