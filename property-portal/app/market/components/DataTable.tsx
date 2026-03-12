"use client";

import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  rows: any[];
  onDelete: (id: number) => void;
}

export default function DataTable({ rows, onDelete }: Props) {

  const columns = [
    { field: "square_footage", headerName: "Sq Ft", flex: 1, minWidth: 100 },
    { field: "bedrooms", headerName: "Bedrooms", flex: 1, minWidth: 100 },
    { field: "bathrooms", headerName: "Bathrooms", flex: 1, minWidth: 100 },
    { field: "year_built", headerName: "Year", flex: 1, minWidth: 100 },
    { field: "lot_size", headerName: "Lot Size", flex: 1, minWidth: 100 },
    { field: "distance_to_city_center", headerName: "Distance", flex: 1, minWidth: 100 },
    { field: "school_rating", headerName: "School Rating", flex: 1, minWidth: 100 },
    {
      field: "price",
      headerName: "Predicted Price",
      flex: 1,
      minWidth: 130,
      renderCell: (params: any) =>
        params.row?.price ? `$${Number(params.row.price).toLocaleString()}` : "-",
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      minWidth: 120,
      sortable: false,
      renderCell: (params: any) => (
        <IconButton color="error" onClick={() => onDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      {/* Section Header */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Property Records
      </Typography>

      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSizeOptions={[5]}
        disableColumnMenu
        disableRowSelectionOnClick
        sx={{
          width: "100%",
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
}