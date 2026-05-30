from fastapi import FastAPI, HTTPException, status
from google import genai
from google.genai import types as genai_types
from PIL import Image
import base64
from config import settings
from models import PeelRequest
import io

PROMPT_FULL_PEEL = (
    "Analyze the fruit/vegetable/legume in the provided image. "
    "Generate a new realistic image showing the exact same "
    "fruit/vegetable/legume, but completely peeled. "
    "Maintain the same angle, natural lighting, and a "
    "clean, neutral background. "
    "The exposed inner flesh must look fresh, juicy, "
    "and highly detailed. "
    "Do not add any extra objects to the scene."
)


client = genai.Client(api_key=settings.gemini_api_key)

# Initialize the FastAPI application
app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Hello, World! Your FastAPI app is up and running."}


@app.post("/peel-base64")
async def peel(request_data: PeelRequest):
    current_mode = request_data.mode
    base64_string = request_data.image_base64

    try:
        interaction = client.interactions.create(
            model="gemini-3.1-flash-image",
            input=[
                {
                    "type": "text",
                    "text": PROMPT_FULL_PEEL,
                },
                {
                    "type": "image",
                    "data": base64_string,
                    "mime_type": "image/jpeg"
                }
            ]
        )

        if interaction.output_image is not None:
            try:
                out_bytes = base64.b64encode(
                    interaction.output_image.data.encode('utf-8'))
                image = Image.open(io.BytesIO(out_bytes))
                image.save("output_copy.jpg")
            except Exception as e:
                print(f"Failed to save copy image: {e}")
        if interaction.output_text is not None:
            print(interaction.output_text)

        # Return a response
        return {
            "status": "processed",
            "mode_used": current_mode,
            "output_image_base64": interaction.output_image.data,
        }

    except Exception as e:
        print(f"An exception occurred: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid base64 string provided."
        )


# Define a dynamic endpoint with a path parameter


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "query_param": q}
