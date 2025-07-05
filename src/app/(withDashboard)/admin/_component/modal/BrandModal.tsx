"use client";

import ReuseableFileUploader from "@/Component/Forms/ReuseableFileUploader";
import ReuseableForm from "@/Component/Forms/ReuseableForm";
import ReuseableInput from "@/Component/Forms/ReuseableInput";
import ReuseableModal from "@/Component/Modal/ReuseableModal";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BrandModal = ({ open, setOpen }: TProps) => {
  const handleSubmit = async (values: FieldValues) => {
    try {
      // Use the field name you used in ReuseableFileUploader ('brandImage' in this case)
      const formData = modifyPayload(values, "brandImage");

      console.log(formData);

      setOpen(false);
    } catch (error) {
      console.error("Error creating brand:", error);
    }
  };

  return (
    <ReuseableModal open={open} setOpen={setOpen} title="Create A Brand">
      <ReuseableForm onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ReuseableInput
              label="Brand Name"
              fullWidth={true}
              name="brandName"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ReuseableInput label="Slug" fullWidth={true} name="slug" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ReuseableInput
              label="Description"
              fullWidth={true}
              name="description"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ReuseableFileUploader label="Brand Image" name="brandImage" />
          </Grid>
        </Grid>
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#20b2aa",
            color: "white",
            width: "100%",
            height: 50,
            fontWeight: 600,
            fontSize: 14,
            margin: "20px 0px 10px 0px",
          }}
          type="submit"
        >
          Create Brand
        </Button>
      </ReuseableForm>
    </ReuseableModal>
  );
};

export default BrandModal;
