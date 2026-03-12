"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";

import PropertyForm from "./components/PropertyForm";
import DataTable from "./components/DataTable";
import MarketChart from "./components/MarketChart";
import ExportButtons from "./components/ExportButtons";
import Loader from "@/components/Loader";

export default function Home() {

  const [properties, setProperties] = useState<any[]>([]);
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (properties.length === 0) {
      setStats(null);
      return;
    }

    getStats();
  }, [properties]);

  const handleAddProperty = (property: any) => {
    const updated = [
      ...properties,
      { id: properties.length + 1, ...property },
    ];

    setProperties(updated);
    runAnalysis(updated);
  };

  const handleDelete = (id: number) => {
    const updated = properties.filter((p) => p.id !== id);

    setProperties(updated);
    runAnalysis(updated);
  };

  const runAnalysis = async (data: any[]) => {
    setLoading(true);

    const startTime = Date.now();

    try {
      const response = await fetch("http://localhost:8082/market/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      const updatedData = data.map((p, i) => ({
        ...p,
        price: result.predicted_prices[i],
      }));

      setProperties(updatedData);

    } catch (error) {
      console.error("Prediction API failed:", error);
    } finally {
      const elapsed = Date.now() - startTime;
      const minDuration = 700;

      if (elapsed < minDuration) {
        await new Promise((resolve) =>
          setTimeout(resolve, minDuration - elapsed)
        );
      }

      setLoading(false);
    }
  };

  const getStats = async () => {
    const payload = properties.map(({ price, id, ...rest }) => rest);
    try {
      const response = await fetch("http://localhost:8082/market/stats",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      setStats(data);
    } catch (error) {
      console.error("Stats API failed", error);
    }
  };

  return (
    <Box sx={{ p: 5 }}>

      {/* Header */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Property Market Analysis
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={3}>
        Add property details, analyze estimated prices, and visualize market trends.
      </Typography>

      <Divider sx={{ mb: 4 }} />

       {/* Property Form */}
      <Box mb={5}>
        <PropertyForm onAddProperty={handleAddProperty} />
      </Box>

      {properties.length > 0 && (
        <>
          {/* Table */}
          <Box mb={5}>
            <DataTable rows={properties} onDelete={handleDelete} />
          </Box>

          {/* Actions */}
          <Box display="flex" mb={4}>
            <ExportButtons data={properties} />
          </Box>

          {stats && (
            <Box
              sx={{
                p: 3,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                mb: 4,
                backgroundColor: "#fafafa",
              }}
            >
              <Typography variant="h6" mb={2} fontWeight="bold">
                Market Statistics
              </Typography>

              <Typography>Total Properties: {stats.total_properties}</Typography>
              <Typography>Average Bedrooms: {stats.avg_bedrooms}</Typography>
              <Typography>Average Bathrooms: {stats.avg_bathrooms}</Typography>
              <Typography>Average Lot Size: {stats.avg_lot_size}</Typography>
            </Box>
          )}

          {/* Chart */}
          {properties.length > 0 && (
            <Box mt={4}>
              <MarketChart data={properties} />
            </Box>
          )}
        </>
      )}

      {loading && <Loader />}

    </Box>
  );
}