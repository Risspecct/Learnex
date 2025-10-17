from fastapi import APIRouter
from pydantic import BaseModel
from features.translator import translate_text

router = APIRouter()


class TranslateRequest(BaseModel):
    text: str
    dest_lang: str


@router.post("/translate/")
def translate_endpoint(request: TranslateRequest):
    translated_text = translate_text(request.text, request.dest_lang)
    return {"translated_text": translated_text}
