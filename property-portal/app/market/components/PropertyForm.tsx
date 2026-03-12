"use client";

import React, { useState } from "react";
import { Grid, TextField, Button, Typography, Box } from "@mui/material";

export interface PropertyFormValues {
  square_footage: number | "";
  bedrooms: number | "";
  bathrooms: number | "";
  year_built: number | "";
  lot_size: number | "";
  distance_to_city_center: number | "";
  school_rating: number | "";
}

interface PropertyFormProps {
  onAddProperty: (property: PropertyFormValues) => void;
}

export default function PropertyForm({ onAddProperty }: PropertyFormProps) {

  const emptyForm: PropertyFormValues = {
    square_footage: "",
    bedrooms: "",
    bathrooms: "",
    year_built: "",
    lot_size: "",
    distance_to_city_center: "",
    school_rating: "",
  };

  const [formValues, setFormValues] = useState<PropertyFormValues>(emptyForm);
  const [error, setError] = useState("");

  const fields: { key: keyof PropertyFormValues; label: string; placeholder: string }[] = [
    { key: "square_footage", label: "Square Footage", placeholder: "1500" },
    { key: "bedrooms", label: "Bedrooms", placeholder: "3" },
    { key: "bathrooms", label: "Bathrooms", placeholder: "2" },
    { key: "year_built", label: "Year Built", placeholder: "2018" },
    { key: "lot_size", label: "Lot Size", placeholder: "5000" },
    { key: "distance_to_city_center", label: "Distance to City Center", placeholder: "10" },
    { key: "school_rating", label: "School Rating", placeholder: "8" },
  ];

  const handleChange = (field: keyof PropertyFormValues, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value === "" ? "" : Number(value),
    }));
    setError("");
  };

  const isFormValid = Object.values(formValues).every((value) => value !== "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError("Please fill all fields before adding a property.");
      return;
    }

    onAddProperty(formValues);

    setFormValues(emptyForm);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Add Property Details
      </Typography>

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}

      <Grid container spacing={2}>

        {fields.map((field) => (
          <Grid key={field.key} size={{ xs: 6, sm: 3 }}>
            <TextField
              label={field.label}
              placeholder={field.placeholder}
              fullWidth
              type="number"
              value={formValues[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              inputProps={{ min: 0 }}
            />
          </Grid>
        ))}

        <Grid size={12} display="flex" alignItems="center">
          <Button type="submit" variant="contained">
            Add Property
          </Button>
        </Grid>

      </Grid>
    </Box>
  );
}