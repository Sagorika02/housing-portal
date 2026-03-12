# Market Analysis API

A **Spring Boot REST API** that performs property market analysis and integrates with a machine learning model to predict housing prices.

This service is part of the **Housing Price Platform**, which includes:

* A Machine Learning model for price prediction
* A market analysis backend (this service)
* A Next.js frontend dashboard for visualization

---

# Tech Stack

* **Java 21**
* **Spring Boot**
* **REST APIs**
* **Docker**
* **ML Model Integration (via API call to ML container)**

---

# Features

* Predict housing prices for multiple properties
* Generate aggregate statistics for property datasets
* RESTful endpoints for frontend dashboard integration
* Supports batch analysis of property data
* Designed to integrate with a machine learning model service

---

# Project Structure

```
market-analysis-api
│
├── controller
│   └── MarketAnalysisController.java
│
├── service
│   └── MarketAnalysisService.java
│
├── dto
│   └── PropertyDTO.java
│
├── MarketAnalysisApiApplication.java
│
└── application.properties
```

---

# API Endpoints

## 1. Predict Property Prices

Predicts housing prices for multiple properties using the ML model.

### Endpoint

```
POST /market/predict
```

### Request Body

```
[
  {
    "squareFootage": 1500,
    "bedrooms": 3,
    "bathrooms": 2,
    "yearBuilt": 2000,
    "lotSize": 5000,
    "distanceToCityCenter": 5,
    "schoolRating": 8
  }
]
```

### Response

```
{
  "predicted_prices": [320000.5]
}
```

---

## 2. Generate Market Statistics

Calculates aggregate statistics for a list of properties.

### Endpoint

```
GET /market/stats
```

### Request Body

```
[
  {
    "bedrooms": 3,
    "bathrooms": 2,
    "lotSize": 5000
  },
  {
    "bedrooms": 4,
    "bathrooms": 3,
    "lotSize": 6200
  }
]
```

### Response

```
{
  "total_properties": 2,
  "avg_bedrooms": 3.5,
  "avg_bathrooms": 2.5,
  "avg_lot_size": 5600
}
```

---

# Running the Application (Local)

### 1. Clone the repository

```
git clone <repo-url>
cd market-analysis-api
```

### 2. Build the project

```
mvn clean install
```

### 3. Run the application

```
mvn spring-boot:run
```

The API will start on:

```
http://localhost:8080
```

---

# Running with Docker

### 1. Build the Docker image

```
docker build -t market-analysis-api .
```

### 2. Run the container

```
docker run -p 8082:8082 market-analysis-api
```

The API will be accessible at:

```
http://localhost:8082
```

---

# Integration with ML Model

The service calls the **housing price ML model API** to generate predictions.

Workflow:

1. Client sends property data to `/market/predict`
2. The service forwards the request to the ML model container
3. The ML model returns predicted prices
4. The predictions are returned to the client

---


