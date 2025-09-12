from fastapi import FastAPI
from features import ai_config
from features.translator_api import router as translator_router
from features.ai_router import router as ai_router
import uvicorn

app = FastAPI()

app.include_router(translator_router, prefix="/api",tags=["translator"])
app.include_router(ai_router, prefix="/ai", tags=["AI Services"])

@app.get("/")
def home():
    return {"message": "Welcome to the Learnex Backend!"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1",port = 8000)