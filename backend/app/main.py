# backend/app/main.py
import uvicorn
from fastapi import FastAPI
from app.api.predict import router as predict_router

app = FastAPI(title="SafeRoom AI Inference API")
app.include_router(predict_router, prefix="/predict")

@app.on_event("shutdown")
def shutdown_event():
    from app.api.predict import processor
    processor.release()

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
