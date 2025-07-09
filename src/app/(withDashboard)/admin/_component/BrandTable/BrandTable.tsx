
import { Box, Typography, IconButton, Chip, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { QueryParam } from "../CategoryTable/CategoryTable";
import { ISubcategory } from "@/types/types";
import { useGetAllBrandQuery } from "@/redux/features/brand/brandApi";

const BrandTable = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid uses 0-based indexing
    pageSize: 10,
  });

  // Fetch subcategories data with the current page and limit
  const {
    data: brandResponse,
    isLoading,
    error,
  } = useGetAllBrandQuery([
    { key: "page", value: paginationModel.page + 1 }, // API uses 1-based indexing
    { key: "limit", value: paginationModel.pageSize },
  ] as QueryParam[]);

  const brands = brandResponse?.data || [];
  const meta = brandResponse?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 0,
  };

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "Sl No",
      width: 70,
      renderCell: (params) => {
        const rowIds = params.api.getSortedRowIds();
        const rowIndex = rowIds.indexOf(params.id);
        return rowIndex + 1;
      },
    },
    {
      field: "brandLogo",
      headerName: "Image",
      width: 120,
      renderCell: ({ row }) => {
        return (
          <Box>
            {row.brandLogo ? (
              <Image
                src={row.brandLogo}
                alt={row.brandName || "brand image"}
                width={50}
                height={50}
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "8px",
                  bgcolor: "grey.200",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  No image
                </Typography>
              </Box>
            )}
          </Box>
        );
      },
    },
    {
      field: "brandName",
      headerName: "Brand Name",
      width: 200,
      editable: false,
    },

    {
      field: "slug",
      headerName: "Slug",
      width: 250,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "ACTIVE" ? "success" : "default"}
          size="small"
          variant="outlined"
        />
      ),
    },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton aria-label="edit" size="small">
              <BorderColorIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" size="small" color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  // Handle error state
  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">Error loading brand</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: 650 }}>
      <DataGrid
        rows={brands}
        columns={columns}
        getRowId={(row: ISubcategory) => row._id}
        rowCount={meta.total}
        pageSizeOptions={[5, 10, 25, 50]}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
        checkboxSelection
        loading={isLoading}
        density="standard"
      />
    </Box>
  );
};

export default BrandTable;
