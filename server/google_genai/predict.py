from google import genai


def predict(prompt, options, image, key):
    client = genai.Client(api_key=key)
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=[prompt, options, image]
    )
    return response
