# Property Estimator API

A FastAPI service that handles property estimation requests and communicates with the **Housing Price ML API** to generate predictions.

This service acts as a **backend wrapper** between the frontend portal and the machine learning model.

---

## Features

- Handles property estimation requests
- Validates incoming property data
- Communicates with the ML model API
- Returns predicted property prices
- FastAPI automatic documentation (Swagger UI)

---

## Tech Stack

- FastAPI
- Python 3.12
- Docker
- REST APIs

---

## API Endpoint

### Estimate Property Price

**POST** `/estimate`

Example request:

```json
{
    "houses": [
        {
        "square_footage": 1500,
        "bedrooms": 3,
        "bathrooms": 2,
        "year_built": 2000,
        "lot_size": 7000,
        "distance_to_city_center": 5,
        "school_rating": 8
        }
    ]
}
```

Example response:

```json
{
  "predictions": [
    230283.12
  ]
}
```

---

## Run Locally

1. Create virtual environment

```
python -m venv venv
```

2. Activate environment

Mac/Linux:

```
source venv/bin/activate
```

Windows:

```
venv\Scripts\activate
```

3. Install dependencies

```
pip install -r requirements.txt
```

4. Run the server

```
uvicorn app.main:app --reload --port 8001
```

API Docs:

```
http://localhost:8001/docs
```

---

## Docker

### Build Image

```
docker build -t property-estimator-api .
```

### Run Container

```
docker run -p 8001:8001 property-estimator-api
```

API Docs:

```
http://localhost:8001/docs
```

> For running the full platform (ML API + Estimator API + Portal), refer to the **root repository README**.

---