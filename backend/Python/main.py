from fastapi import FastAPI
from features.translator_api import router as translator_router
from features.ai_router import router as ai_router
from fastapi.middleware.cors import CORSMiddleware
from Syllabus.syllabus_router import router as syllabus_router
import os
# import uvicorn

app = FastAPI()

origins = os.getenv("CORS_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(translator_router, prefix="/api",tags=["translator"])
app.include_router(ai_router, prefix="/ai", tags=["AI Services"])
app.include_router(syllabus_router, prefix="/syllabus", tags=["Syllabus"])

@app.get("/")
def home():
    return {"message": "Welcome to the Learnex Backend!"}

# if __name__ == "__main__":
#     uvicorn.run(app, host="127.0.0.1", port=8000)
