from pydantic import BaseModel


class PeelRequest(BaseModel):
    mode: str
    image_base64: str
