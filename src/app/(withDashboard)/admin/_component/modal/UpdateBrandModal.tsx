/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, CircularProgress, Grid, Snackbar, Alert } from "@mui/material";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import ReuseableForm from "@/Component/Forms/ReuseableForm";
import ReuseableInput from "@/Component/Forms/ReuseableInput";
import ReuseableFileUploader from "@/Component/Forms/ReuseableFileUploader";
import ReuseableModal from "@/Component/Modal/ReuseableModal";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { useUpdateBrandMutation } from "@/redux/api/brandApi";
import { useState } from "react";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  brand: any;
};

const UpdateBrandModal = ({ open, setOpen, brand }: TProps) => {
  const [updateBrand] = useUpdateBrandMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleSubmit = async (values: FieldValues) => {
    setIsSubmitting(true);
    try {
      const imageFile =
        values.brandImage instanceof File ? values.brandImage : null;
      const dataWithoutImage = {
        brandName: values.brandName,
        slug: values.slug,
        description: values.description,
      };

      const formData = modifyPayload(dataWithoutImage, "brandImage", imageFile);
      const res = await updateBrand({
        id: brand._id,
        payload: formData,
      }).unwrap();

      // console.log("res", res);

      if (res?.success && res?.statusCode === 200) {
        setSnackbar({
          open: true,
          message: res?.message || "Brand updated successfully!",
          severity: "success",
        });
        setOpen(false);
      } else {
        setSnackbar({
          open: true,
          message: "Failed to update brand",
          severity: "error",
        });
      }
    } catch (error: any) {
      console.error("Error updating brand:", error);
      setSnackbar({
        open: true,
        message:
          error?.data?.message || error?.message || "Failed to update brand",
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
      <ReuseableModal open={open} setOpen={setOpen} title="Update Brand">
        <ReuseableForm
          onSubmit={handleSubmit}
          defaultValues={{
            brandName: brand?.brandName || "",
            slug: brand?.slug || "",
            description: brand?.description || "",
            brandImage: brand?.brandLogo || null,
          }}
          // resolver={zodResolver(BrandValidation.UpdateBrnadValidationSchema)}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ReuseableInput
                label="Brand Name"
                fullWidth={true}
                name="brandName"
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
            <Grid size={{ xs: 12 }}>
              <ReuseableFileUploader label="Brand Logo" name="brandImage" />
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
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Update Brand"
            )}
          </Button>
        </ReuseableForm>
      </ReuseableModal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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

export default UpdateBrandModal;
