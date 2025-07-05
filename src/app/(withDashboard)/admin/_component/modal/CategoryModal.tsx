/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ReuseableFileUploader from "@/Component/Forms/ReuseableFileUploader";
import ReuseableForm from "@/Component/Forms/ReuseableForm";
import ReuseableInput from "@/Component/Forms/ReuseableInput";
import ReuseableModal from "@/Component/Modal/ReuseableModal";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { MetaTagsField } from "@/Component/Forms/MetaTagsField";
import { useCreateCategoryMutation } from "@/redux/api/categoryApi";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CategoryModal = ({ open, setOpen }: TProps) => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const handleSubmit = async (values: FieldValues) => {
    const { imageUrl, ...rest } = values;
    console.log(imageUrl, rest);
    try {
      const formData = modifyPayload(rest, "category-Image", imageUrl);

      const res = await createCategory(formData).unwrap();
      if (res?.statusCode === 201) {
        toast.success(res?.message);
      }

      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.error("Error creating category:", error);
    }
  };

  const defaultValues = {
    categoryName: "",
    slug: "",
    description: "",
    imageUrl: "",
    metaTags: [""], // Initialize with one empty field
  };

  return (
    <ReuseableModal open={open} setOpen={setOpen} title="Create A Category">
      <ReuseableForm onSubmit={handleSubmit} defaultValues={defaultValues}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ReuseableInput
              label="Category Name"
              fullWidth={true}
              name="categoryName"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#00a698",
                  },
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "#00a698",
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ReuseableInput
              label="Slug"
              fullWidth={true}
              name="slug"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#00a698",
                  },
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "#00a698",
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ReuseableInput
              label="Description"
              fullWidth={true}
              name="description"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#00a698",
                  },
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "#00a698",
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ReuseableFileUploader
              label="Category Image"
              name="imageUrl"
              sx={{ bgcolor: "#00a698", color: "white" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <MetaTagsField />
          </Grid>
        </Grid>
        <Button
          loading={isLoading}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#20b2aa",
            color: "white",
            width: "100%",
            height: 40,
            fontWeight: 600,
            fontSize: 14,
            margin: "20px 0px 10px 0px",
          }}
          type="submit"
        >
          Create Category
        </Button>
      </ReuseableForm>
    </ReuseableModal>
  );
};

export default CategoryModal;
