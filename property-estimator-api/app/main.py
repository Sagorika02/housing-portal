from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import PredictionRequest, PredictionResponse
from .services import call_ml_model

app = FastAPI(
    title="Property Estimator API",
    description="Backend service for property price estimation",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/estimate", response_model=PredictionResponse)
def estimate_price(request: PredictionRequest):

    try:

        result = call_ml_model(request.dict())

        return result

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )