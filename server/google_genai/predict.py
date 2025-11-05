from google import genai
import config

def predict(prompt: str, options, image):
    client = genai.Client(api_key=config.AI_KEY)

    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=[prompt, options, image]
    )
    return response
