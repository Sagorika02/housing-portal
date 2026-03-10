## Docker Setup

This project consists of three services:

1. **Housing Price ML API** – FastAPI service running the regression model  
2. **Property Estimator API** – FastAPI wrapper that communicates with the ML API  
3. **Property Portal** – Next.js frontend application  

All services are orchestrated using **Docker Compose**.

---

## Run the Full Platform

From the project root directory, run:

```bash
docker compose up --build
```

Docker Compose will:

- Build all service images
- Create the required network
- Start all containers
- Connect the services together

---

## Access the Services

| Service | URL |
|------|------|
Housing Price ML API | http://localhost:8000/docs |
Property Estimator API | http://localhost:8001/docs |
Property Portal | http://localhost:3000 |

---

## Stop the Platform

Press `CTRL + C` in the terminal or run:

```bash
docker compose down
```

---

## Architecture

```
Next.js Portal (3000)
        |
        v
Property Estimator API (8001)
        |
        v
Housing Price ML API (8000)
```