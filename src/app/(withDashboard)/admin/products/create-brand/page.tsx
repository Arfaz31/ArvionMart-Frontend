"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import BrandModal from "../../_component/modal/BrandModal";
import { useState } from "react";
import BrandTable from "../../_component/BrandTable/BrandTable";

const CreateBrand = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Brand
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#20b2aa",
            color: "white",
            width: 180,
            height: 50,
            fontWeight: 600,
            fontSize: 16,
          }}
          onClick={() => setOpen(true)}
        >
          Create Brand
        </Button>
        <BrandModal open={open} setOpen={setOpen} />
        <TextField size="small" placeholder="Search Brand" />
      </Stack>
      <Box sx={{ mt: 4 }}>
        <BrandTable />
      </Box>
    </Box>
  );
};

export default CreateBrand;
