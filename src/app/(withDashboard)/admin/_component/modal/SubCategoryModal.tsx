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
import { useCreateSubcategoryMutation } from "@/redux/features/subcategory/subcategoryApi";
import { toast } from "sonner";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { ICategory } from "@/types/types";
import ReuseableSelectField from "@/Component/Forms/ReuseableSelect";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubCategoryModal = ({ open, setOpen }: TProps) => {
  const [createSubcategory, { isLoading }] = useCreateSubcategoryMutation();
  const { data: categoryData } = useGetCategoriesQuery([
    { key: "fields", value: "_id,categoryName" },
    { key: "limit", value: 100 },
  ]);

  const categoryOption =
    categoryData?.data?.map((category: ICategory) => ({
      label: category.categoryName,
      value: category._id,
    })) || [];

  const handleSubmit = async (values: FieldValues) => {
    const { imageUrl, ...rest } = values;
    try {
      const formData = modifyPayload(rest, "subcategory-Image", imageUrl);
      const res = await createSubcategory(formData).unwrap();
      console.log(res);
      if (res?.message) {
        toast.success(res?.message);
        setOpen(false);
      }
    } catch (error: any) {
      console.error("Error creating sub-category:", error);
      toast.error(error?.data?.message);
    }
  };

  const defaultValues = {
    subcategoryName: "",
    category: "",
    slug: "",
    description: "",
    imageUrl: "",
    metaTags: [""],
  };

  return (
    <ReuseableModal open={open} setOpen={setOpen} title="Create A Sub-Category">
      <ReuseableForm onSubmit={handleSubmit} defaultValues={defaultValues}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ReuseableInput
              label="Sub-Category Name"
              fullWidth={true}
              name="subcategoryName"
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
            <ReuseableSelectField
              items={categoryOption}
              name="category"
              label="Category"
              fullWidth={true}
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
              label="Image"
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
          Create Sub-Category
        </Button>
      </ReuseableForm>
    </ReuseableModal>
  );
};

export default SubCategoryModal;
