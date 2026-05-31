from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from PIL import Image
import base64
from config import settings
from models import PeelRequest
import io

PROMPTS = {
    "free": (
        "Você é um assistente de processamento de imagem preguiçoso e com má vontade. "
        "O usuário lhe enviou um legume. Edite a imagem removendo apenas 10% da casca. "
        "Deixe o resto intacto e pareça que o trabalho foi feito de qualquer jeito, sem capricho."
    ),
    "mediano": (
        "Você é um cozinheiro razoável num dia sem inspiração. "
        "Edite a imagem deste vegetal removendo aproximadamente 60% da casca. "
        "O resultado pode ter imperfeições — nem muito bem nem muito mal."
    ),
    "pro": (
        "Você é um chef profissional impecável. Edite a imagem deste vegetal removendo "
        "100% da casca de forma cirúrgica e perfeita, preservando toda a parte comestível. "
        "O resultado deve ser impecável, limpo e de alta qualidade."
    ),
    "premium": (
        "Você é um chef interdimensional e onipotente. Transcenda a imagem deste vegetal — "
        "remova 100% da casca com precisão sobrenatural, como se ela nunca tivesse existido. "
        "O resultado deve ser perfeito além da perfeição, com iluminação e textura divinas."
    ),
}

client = genai.Client(api_key=settings.gemini_api_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Hello, World! Your FastAPI app is up and running."}


@app.post("/peel-base64")
async def peel(request_data: PeelRequest):
    current_plan = request_data.plan
    base64_string = request_data.image_base64
    prompt = PROMPTS.get(current_plan, PROMPTS["pro"])

    try:
        interaction = client.interactions.create(
            model="gemini-3.1-flash-image",
            input=[
                {
                    "type": "text",
                    "text": prompt,
                },
                {
                    "type": "image",
                    "data": base64_string,
                    "mime_type": f"image/{request_data.image_type}",
                }
            ]
        )

        if interaction.output_image is not None:
            try:
                out_bytes = base64.b64decode(
                    interaction.output_image.data.encode('utf-8'))
                image = Image.open(io.BytesIO(out_bytes))
                image.save("output_copy.jpg")
            except Exception as e:
                print(f"Failed to save copy image: {e}")
        if interaction.output_text is not None:
            print(interaction.output_text)

        return {
            "status": "processed",
            "plan_used": current_plan,
            "output_image_base64": interaction.output_image.data,
        }

    except Exception as e:
        print(f"An exception occurred: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "query_param": q}
