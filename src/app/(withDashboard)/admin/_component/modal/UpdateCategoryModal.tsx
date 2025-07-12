/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Grid, CircularProgress, Snackbar, Alert } from "@mui/material";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import ReuseableForm from "@/Component/Forms/ReuseableForm";
import ReuseableInput from "@/Component/Forms/ReuseableInput";
import ReuseableFileUploader from "@/Component/Forms/ReuseableFileUploader";
import ReuseableModal from "@/Component/Modal/ReuseableModal";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { useUpdateCategoryMutation } from "@/redux/api/categoryApi";
import { useState } from "react";
import { MetaTagsField } from "@/Component/Forms/MetaTagsField";

interface ICategory {
  _id: string;
  categoryName: string;
  slug: string;
  description: string;
  imageUrl: string;
  metaTags: string[];
  status: string;
}

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: ICategory;
};

const UpdateCategoryModal = ({ open, setOpen, category }: TProps) => {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleSubmit = async (values: FieldValues) => {
    setIsSubmitting(true);
    try {
      const imageFile = values.imageUrl?.[0] || null;
      const dataWithoutImage = {
        categoryName: values.categoryName,
        slug: values.slug,
        description: values.description,
        metaTags: values.metaTags.filter((tag: string) => tag.trim() !== ""),
      };

      const formData = modifyPayload(
        dataWithoutImage,
        "category-Image",
        imageFile
      );
      const res = await updateCategory({
        id: category._id,
        payload: formData,
      }).unwrap();

      if (res?.success) {
        setSnackbar({
          open: true,
          message: res.message || "Category updated successfully",
          severity: "success",
        });
        setOpen(false);
      } else {
        setSnackbar({
          open: true,
          message: res?.message || "Failed to update category",
          severity: "error",
        });
      }
    } catch (error: any) {
      console.error("Error updating category:", error);
      setSnackbar({
        open: true,
        message:
          error?.data?.message || error?.message || "Failed to update category",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <ReuseableModal open={open} setOpen={setOpen} title="Update Category">
        <ReuseableForm
          onSubmit={handleSubmit}
          defaultValues={{
            categoryName: category?.categoryName || "",
            slug: category?.slug || "",
            description: category?.description || "",
            imageUrl: undefined,
            metaTags: category?.metaTags?.length ? category.metaTags : [""],
          }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ReuseableInput
                label="Category Name"
                fullWidth={true}
                name="categoryName"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ReuseableInput
                label="Slug"
                fullWidth={true}
                name="slug"
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <ReuseableInput
                label="Description"
                fullWidth={true}
                name="description"
                multiline
                rows={4}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ReuseableFileUploader label="Category Image" name="imageUrl" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <MetaTagsField />
            </Grid>
          </Grid>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              color: "white",
              width: "100%",
              height: 50,
              fontWeight: 600,
              fontSize: 14,
              margin: "20px 0px 10px 0px",
              background: "linear-gradient(135deg, #1565c0 0%, #5648d6 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #0d47a1 0%, #4527a0 100%)",
                boxShadow: "0 4px 12px rgba(86, 72, 214, 0.3)",
              },
            }}
            type="submit"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Update Category"
            )}
          </Button>
        </ReuseableForm>
      </ReuseableModal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateCategoryModal;
