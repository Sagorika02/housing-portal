"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { Box, Typography, Grid } from "@mui/material";

interface MarketChartProps {
  data: any[];
}

export default function MarketChart({ data }: MarketChartProps) {
  if (data.length === 0) return null;

  const charts = [
    { key: "bedrooms", title: "Bedrooms vs Price" },
    { key: "bathrooms", title: "Bathrooms vs Price" },
    { key: "square_footage", title: "Square Footage vs Price" },
    { key: "lot_size", title: "Lot Size vs Price" },
    { key: "distance_to_city_center", title: "Distance to City Center vs Price" },
    { key: "school_rating", title: "School Rating vs Price" },
    { key: "year_built", title: "Year Built vs Price" },
  ];

  return (
    <Box mt={6}>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Market Analysis Charts
      </Typography>

      <Grid container spacing={4}>
        {charts.map((chart) => (
          <Grid key={chart.key} size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                p: 3,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: "#fafafa",
              }}
            >
              <Typography variant="h6" mb={2}>
                {chart.title}
              </Typography>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey={chart.key} label={{value: chart.key, position: "bottom"}} />

                  <YAxis/>
                  
                  <Tooltip />

                  <Bar dataKey="price" fill="#d17f59" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}