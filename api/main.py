from fastapi import FastAPI, HTTPException, status
from google import genai
# from PIL import Image
import base64
from config import settings
from models import PeelRequest

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
        image_bytes = base64.b64decode(base64_string)
        interaction = client.interactions.create(
            model="gemini-2.5-flash-image",
            input="generate the image of an apple",
        )

        print(interaction.output_image)

    except Exception as e:
        print(f"An exception occurred: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid base64 string provided."
        )

    # Return a response
    return {
        "status": "processed",
        "mode_used": current_mode,
        "decoded_size_bytes": len(image_bytes)
    }

# Define a dynamic endpoint with a path parameter


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "query_param": q}
