/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { Box, Typography, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Image from "next/image";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

// Define the Category type based on the API response
interface Category {
  _id: string;
  categoryName: string;
  description: string;
  slug: string;
  imageUrl: string;
  status: string;
  isDeleted: boolean;
  metaTags: string[];
  createdAt: string;
  updatedAt: string;
  subCategory: any[];
  product: any[];
}

// Define Meta type for pagination
interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

// Define API response structure
interface CategoryResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: Category[];
}

// Define query parameter interface
export interface QueryParam {
  key: string;
  value: number | string;
}

const CategoryTable = () => {
  // State for pagination
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid uses 0-based indexing
    pageSize: 10,
  });

  // Fetch categories data with the current page and limit
  const {
    data: categoryResponse,
    isLoading,
    error,
  } = useGetCategoriesQuery([
    { key: "page", value: paginationModel.page + 1 }, // API uses 1-based indexing
    { key: "limit", value: paginationModel.pageSize },
  ] as QueryParam[]);

  // Extract categories and meta from the response safely
  const response = categoryResponse as CategoryResponse | undefined;
  const categories = response?.data || [];
  const meta = response?.meta || { page: 1, limit: 10, total: 0, totalPage: 0 };

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
      headerName: "Category Image",
      width: 180,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Image
              src={row.imageUrl}
              alt="categoryImage"
              width={50}
              height={50}
              style={{
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        );
      },
    },
    {
      field: "categoryName",
      headerName: "Category Name",
      width: 180,
      editable: false,
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
      width: 140,
      editable: false,
    },
    {
      field: "metaTags",
      headerName: "Meta Tags",
      width: 180,
      editable: false,
      renderCell: (params: GridRenderCellParams<any, string[]>) => (
        <Typography variant="body2">
          {params.value &&
          Array.isArray(params.value) &&
          params.value.length > 0
            ? params.value.slice(0, 2).join(", ") +
              (params.value.length > 2 ? "..." : "")
            : "N/A"}
        </Typography>
      ),
    },

    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: () => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton aria-label="edit">
            <BorderColorIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Handle error state
  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">Error loading categories</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: 500 }}>
      <DataGrid
        rows={categories}
        columns={columns}
        getRowId={(row: Category) => row._id}
        rowCount={meta.total}
        pageSizeOptions={[5, 10, 25]}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
        checkboxSelection
        loading={isLoading}
      />
    </Box>
  );
};

export default CategoryTable;
