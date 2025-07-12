/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, IconButton, Chip, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDeleteBrandMutation } from "@/redux/api/brandApi";
import { toast } from "sonner";
import UpdateBrandModal from "../modal/UpdateBrandModal";
import DeleteConfirmationModal from "../modal/BrandDeleteConfirmationModal";

// Define the Brand type interface
interface Brand {
  _id: string;
  brandName: string;
  slug: string;
  description: string;
  brandLogo?: string;
  status: "ACTIVE" | "INACTIVE";
  isDeleted: boolean;
}

const BrandTable = ({ brands, meta }: any) => {
  const [deleteBrand] = useDeleteBrandMutation();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // Modal states - properly typed
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  // Handle update
  const handleUpdateClick = (brand: Brand) => {
    setSelectedBrand(brand);
    setUpdateModalOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteClick = (brand: Brand) => {
    setSelectedBrand(brand);
    setDeleteModalOpen(true);
  };

  // Handle actual deletion
  const handleConfirmDelete = async () => {
    if (!selectedBrand) return; // Guard clause to prevent null access

    try {
      const res = await deleteBrand(selectedBrand._id).unwrap();
      if (res.success) {
        toast.success("Brand deleted successfully");
        setDeleteModalOpen(false);
        setSelectedBrand(null); // Reset selected brand
      }
    } catch (error: any) {
      console.error("Error deleting brand:", error);
      toast.error("Failed to delete brand");
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
      field: "brandLogo",
      headerName: "Image",
      width: 120,
      renderCell: ({ row }) => (
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
      ),
    },
    {
      field: "brandName",
      headerName: "Brand Name",
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
          rows={brands}
          columns={columns}
          getRowId={(row) => row._id}
          rowCount={meta?.total || 0}
          pageSizeOptions={[5, 10, 25, 50]}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
          loading={!brands.length}
          density="standard"
        />
      </Box>

      {/* Update Brand Modal */}
      {selectedBrand && (
        <UpdateBrandModal
          open={updateModalOpen}
          setOpen={setUpdateModalOpen}
          brand={selectedBrand}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Brand"
        message={`Are you sure you want to delete ${selectedBrand?.brandName || "this brand"}?`}
      />
    </>
  );
};

export default BrandTable;
