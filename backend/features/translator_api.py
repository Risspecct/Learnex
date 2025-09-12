from fastapi import APIRouter
from features.translator import translate_text

router = APIRouter()

@router.get("/translate/")
async def translate_endpoint(text: str, dest_lang: str):
    translated_text = await translate_text(text, dest_lang)
    return {"translated_text": translated_text}