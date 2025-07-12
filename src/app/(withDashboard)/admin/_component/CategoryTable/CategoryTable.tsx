/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, IconButton, Chip, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDeleteCategoryMutation } from "@/redux/api/categoryApi";
import { toast } from "sonner";
import UpdateCategoryModal from "../modal/UpdateCategoryModal";

import CategoryDeleteConfirmationModal from "../modal/CategoryDeleteConfirmationModal";

interface ICategory {
  _id: string;
  categoryName: string;
  slug: string;
  description: string;
  imageUrl: string;
  metaTags: string[];
  status: string;
  isDeleted: boolean;
}

const CategoryTable = ({
  categories,
  meta,
}: {
  categories: ICategory[];
  meta: any;
}) => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // Modal states
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  // Handle update
  const handleUpdateClick = (category: ICategory) => {
    setSelectedCategory(category);
    setUpdateModalOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteClick = (category: ICategory) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  // Handle actual deletion
  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;

    try {
      const res = await deleteCategory(selectedCategory._id).unwrap();
      if (res.success) {
        toast.success("Category deleted successfully");
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
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
      renderCell: ({ row }) => (
        <Box>
          {row.imageUrl ? (
            <Image
              src={row.imageUrl}
              alt={row.categoryName || "category image"}
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
      ),
    },
    {
      field: "categoryName",
      headerName: "Category Name",
      flex: 1,
    },
    {
      field: "slug",
      headerName: "Slug",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
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
      flex: 1,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              size="small"
              onClick={() => handleUpdateClick(row)}
            >
              <BorderColorIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              size="small"
              color="error"
              onClick={() => handleDeleteClick(row)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ width: "100%", height: 650 }}>
        <DataGrid
          rows={categories}
          columns={columns}
          getRowId={(row) => row._id}
          rowCount={meta?.total || 0}
          pageSizeOptions={[5, 10, 25, 50]}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
          loading={!categories.length}
          density="standard"
        />
      </Box>

      {/* Update Category Modal */}
      {selectedCategory && (
        <UpdateCategoryModal
          open={updateModalOpen}
          setOpen={setUpdateModalOpen}
          category={selectedCategory}
        />
      )}

      {/* Delete Confirmation Modal */}
      <CategoryDeleteConfirmationModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message={`Are you sure you want to delete ${selectedCategory?.categoryName || "this category"}?`}
      />
    </>
  );
};

export default CategoryTable;
