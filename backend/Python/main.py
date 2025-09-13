from fastapi import FastAPI
from features.translator_api import router as translator_router
from features.ai_router import router as ai_router
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

origins = [
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)

app.include_router(translator_router, prefix="/api",tags=["translator"])
app.include_router(ai_router, prefix="/ai", tags=["AI Services"])

@app.get("/")
def home():
    return {"message": "Welcome to the Learnex Backend!"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
