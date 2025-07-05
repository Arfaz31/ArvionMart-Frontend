"use client";
import { Box, Button, Stack, TextField } from "@mui/material";

import { useState } from "react";
import SubCategoryModal from "../../_component/modal/SubCategoryModal";
import SubCategoryTable from "../../_component/SubCategoryTable/SubCategoryTable";

const CreateSubCategory = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#20b2aa",
            color: "white",
            width: 270,
            height: 50,
            fontWeight: 600,
            fontSize: 16,
          }}
          onClick={() => setOpen(true)}
        >
          Create Sub-Category
        </Button>
        <SubCategoryModal open={open} setOpen={setOpen} />
        <TextField size="small" placeholder="Search Sub-Category" />
      </Stack>
      <Box sx={{ mt: 4 }}>
        <SubCategoryTable />
      </Box>
    </Box>
  );
};

export default CreateSubCategory;
