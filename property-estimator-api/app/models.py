from pydantic import BaseModel, Field
from typing import List


class PropertyInput(BaseModel):
    square_footage: float = Field(..., gt=0)
    bedrooms: int = Field(..., gt=0)
    bathrooms: int = Field(..., gt=0)
    year_built: int = Field(..., gt=1800)
    lot_size: float = Field(..., gt=0)
    distance_to_city_center: float = Field(..., ge=0)
    school_rating: float = Field(..., ge=0, le=10)


class PredictionRequest(BaseModel):
    houses: List[PropertyInput]


class PredictionResponse(BaseModel):
    predictions: List[float]