# 🏠 Property Portal

A modern **Next.js dashboard** that provides a unified interface for interacting with housing price prediction and market analysis services.

The portal allows users to estimate property prices using a Machine Learning model and visualise predictions through tables and charts.

---

## Features

- Property price estimator form
- Client-side validation with error messages
- Prediction results displayed in a table
- Visual chart representation of predictions
- History of previous estimates
- Property comparison through side-by-side results
- Responsive SaaS-style dashboard layout
- Header and footer navigation
- Loading indicator while predictions are being generated

---

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Recharts
- TypeScript

---

## How It Works

1. Users enter property details in the estimator form.
2. The portal sends a request to the **Property Estimator API**.
3. The estimator API communicates with the **ML model service**.
4. The predicted housing price is returned to the portal.
5. Results are displayed in a table and visualised in a chart.

---

## Run Locally

1. Install dependencies

```
npm install
```

2. Start the development server

```
npm run dev
```

3. Open the application

```
http://localhost:3000
```

---

## Docker

Build the image:

```
docker build -t property-portal .
```

Run the container:

```
docker run -p 3000:3000 property-portal
```

The application will be available at:

```
http://localhost:3000
```

> For running the full platform (ML API + Estimator API + Portal), refer to the **root repository README**.

---

