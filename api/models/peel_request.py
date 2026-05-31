from pydantic import BaseModel


class PeelRequest(BaseModel):
    plan: str
    image_base64: str
    image_type: str
