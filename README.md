# 🏠 Housing ML Portal

A comprehensive real estate platform that combines machine learning predictions with modern web technologies to provide property value estimation and market analysis capabilities.

## 📋 Overview

The Housing ML Portal is a full-stack application that leverages machine learning to predict property values and analyze real estate market trends. The platform consists of multiple microservices working together to deliver accurate property valuations and insightful market analytics.

## 🏗️ Architecture

The application follows a microservices architecture with the following components:

### Services

1. **🏠 Housing Price ML API** (FastAPI)
   - Core machine learning service running regression models
   - Handles property price predictions
   - Port: `8000`

2. **📊 Property Estimator API** (FastAPI)
   - REST API wrapper for the ML service
   - Provides clean endpoints for property estimation
   - Port: `8001`

3. **📈 Market Analysis API** (Spring Boot)
   - Advanced market analytics and statistics
   - Handles bulk property analysis and market trends
   - Port: `8082`

4. **🌐 Property Portal** (Next.js)
   - Modern React-based frontend application
   - User-friendly interface for property estimation and market analysis
   - Port: `3000`

### Data Flow

```
Property Portal (3000) ↔ Property Estimator API (8001) ↔ Housing Price ML API (8000)
                      ↘ Market Analysis API (8082) ↗
```

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Git

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd housing-portal
   ```

2. **Start all services:**
   ```bash
   docker compose up --build
   ```

3. **Access the application:**
   - **Property Portal:** http://localhost:3000
   - **Housing Price API Docs:** http://localhost:8000/docs
   - **Property Estimator API Docs:** http://localhost:8001/docs
   - **Market Analysis API:** http://localhost:8082

### Stopping the Application

```bash
docker compose down
```

## 🎯 Features

### Property Value Estimator
- **Real-time Price Prediction:** Input property details to get instant ML-powered price estimates
- **Comprehensive Input Fields:** Square footage, bedrooms, bathrooms, year built, lot size, distance to city center, school rating
- **Prediction History:** View and compare multiple property estimates
- **Interactive Charts:** Visualize prediction trends and historical data

### Market Analysis
- **Bulk Property Analysis:** Add multiple properties for comparative market analysis
- **Statistical Insights:** Get detailed market statistics and trends
- **Data Visualization:** Interactive charts showing market patterns
- **Export Capabilities:** Export analysis results in various formats
- **Property Management:** Add, view, and delete properties from analysis

### Technical Features
- **Form Validation:** Ensures all required fields are filled before submission
- **Loading States:** Visual feedback during API calls with overlay loader
- **Responsive Design:** Works seamlessly across desktop and mobile devices
- **Error Handling:** Comprehensive error handling with user-friendly messages

## 🛠️ Technology Stack

### Backend Services
- **Housing Price ML API:** Python, FastAPI, Scikit-learn, Pandas, NumPy
- **Property Estimator API:** Python, FastAPI, Requests
- **Market Analysis API:** Java, Spring Boot, Maven

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Material-UI (MUI)
- **Charts:** Custom chart components with responsive design

### Infrastructure
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **Networking:** Custom Docker network for service communication

## 📁 Project Structure

```
housing-portal/
├── housing-price-api/          # ML Model API (FastAPI)
│   ├── app/
│   │   ├── main.py            # FastAPI application
│   │   ├── model.py           # ML model loading and prediction
│   │   ├── schemas.py         # Pydantic schemas
│   │   ├── utils.py           # Utility functions
│   ├── data/                  # Training data and datasets
│   ├── Dockerfile
│   ├── requirements.txt
│   └── README.md
├── property-estimator-api/    # Estimator API (FastAPI)
│   ├── app/
│   │   ├── config.py          # Configuration
│   │   ├── main.py            # FastAPI application
│   │   ├── models.py          # Data models
│   │   └── services.py        # Business logic
│   ├── Dockerfile
│   ├── requirements.txt
│   └── README.md
├── market-analysis-api/       # Market Analysis API (Spring Boot)
│   ├── src/main/java/com/example/marketapi/
│   │   ├── MarketAnalysisApiApplication.java
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   └── service/
│   ├── src/main/resources/
│   ├── Dockerfile
│   ├── pom.xml
│   └── README.md
├── property-portal/           # Frontend (Next.js)
│   ├── app/
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout with navigation
│   │   ├── page.tsx           # Home page
│   │   ├── estimator/         # Property estimator page
│   │   └── market/            # Market analysis page
│   │       └── components/    # Market-specific components
│   ├── components/            # Shared components
│   │   ├── Loader.tsx         # Loading overlay component
│   │   └── PredictionChart.tsx # Chart component
│   ├── public/                # Static assets
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
├── docker-compose.yml         # Docker orchestration
└── README.md                  # This file
```

## 🔧 Development

### Individual Service Development

Each service can be developed independently:

1. **Housing Price ML API:**
   ```bash
   cd housing-price-api
   pip install -r requirements.txt
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Property Estimator API:**
   ```bash
   cd property-estimator-api
   pip install -r requirements.txt
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
   ```

3. **Market Analysis API:**
   ```bash
   cd market-analysis-api
   ./mvnw spring-boot:run
   ```

4. **Property Portal:**
   ```bash
   cd property-portal
   npm install
   npm run dev
   ```

---

## 📊 API Endpoints

### Housing Price ML API
- `POST /predict` - Predict property prices
- `GET /health` - Health check

### Property Estimator API
- `POST /estimate` - Estimate single property value
- `GET /health` - Health check

### Market Analysis API
- `POST /market/predict` - Bulk property price prediction
- `POST /market/stats` - Market statistics and analysis
- `GET /health` - Health check


## 🙏 Acknowledgments

- Built with modern web technologies and machine learning
- Inspired by real estate analytics platforms
- Thanks to the open-source community for the amazing tools and libraries

---

**Built with ❤️ using Next.js, FastAPI, Spring Boot & Docker**