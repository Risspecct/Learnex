from fastapi import APIRouter
from features import generator

router = APIRouter()


@router.post("/generate")
def generator_text(request: generator.GeneratorRequest):
    return generator.generate_text(request)