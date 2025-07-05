/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, IconButton, Chip, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Image from "next/image";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useGetSubcategoriesQuery } from "@/redux/features/subcategory/subcategoryApi";
import { QueryParam } from "../CategoryTable/CategoryTable";
import { ISubcategory } from "@/types/types";

const CustomersTable = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid uses 0-based indexing
    pageSize: 10,
  });

  // Fetch subcategories data with the current page and limit
  const {
    data: subcategoryResponse,
    isLoading,
    error,
  } = useGetSubcategoriesQuery([
    { key: "page", value: paginationModel.page + 1 }, // API uses 1-based indexing
    { key: "limit", value: paginationModel.pageSize },
  ] as QueryParam[]);

  const subcategories = subcategoryResponse?.data || [];
  const meta = subcategoryResponse?.meta || {
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
      field: "imageUrl",
      headerName: "Image",
      width: 120,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {row.imageUrl ? (
              <Image
                src={row.imageUrl}
                alt={row.subcategoryName || "subcategory image"}
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
      field: "subcategoryName",
      headerName: "Subcategory Name",
      width: 180,
      editable: false,
    },
    {
      field: "category",
      headerName: "Parent Category",
      width: 160,
      renderCell: ({ row }) => {
        return (
          <Typography variant="body2">{row.category.categoryName}</Typography>
        );
      },
    },
    {
      field: "slug",
      headerName: "Slug",
      width: 150,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
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
      field: "metaTags",
      headerName: "Meta Tags",
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string[]>) => {
        const tags = params.value;
        if (!tags || !Array.isArray(tags) || tags.length === 0) {
          return <Typography variant="body2">N/A</Typography>;
        }

        const displayTags = tags.slice(0, 2);
        const remainingCount = tags.length - 2;

        return (
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {displayTags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{ fontSize: "0.7rem", height: 20 }}
              />
            ))}
            {remainingCount > 0 && (
              <Tooltip title={tags.slice(2).join(", ")}>
                <Chip
                  label={`+${remainingCount} more`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.7rem", height: 20 }}
                />
              </Tooltip>
            )}
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
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
        <Typography color="error">Error loading subcategories</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: 650 }}>
      <DataGrid
        rows={subcategories}
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

export default CustomersTable;
