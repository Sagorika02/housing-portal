"use client";

import { saveAs } from "file-saver";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Box, Button } from "@mui/material";

export default function ExportButtons({ data }: any) {
  const exportCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "market-analysis.csv");
  };

  const exportPDF = () => {
  const doc = new jsPDF();

  const rows = data.map((p: any) => [
      p.square_footage,
      p.bedrooms,
      p.bathrooms,
      p.year_built,
      p.lot_size,
      p.distance_to_city_center,
      p.school_rating,
      p.price,
    ]);

    autoTable(doc, {
      head: [["SqFt", "Beds", "Baths", "Year", "Lot", "Distance", "School", "Price"]],
      body: rows,
    });

    doc.save("market-analysis.pdf");
  };

  return (
    <Box display="flex" gap={2}>
      <Button variant="contained" color="secondary" onClick={exportCSV}> Export CSV </Button>
      <Button variant="contained" color="secondary" onClick={exportPDF}> Export PDF </Button>
    </Box>
  );
}