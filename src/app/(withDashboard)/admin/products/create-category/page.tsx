"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import { useState } from "react";
import CategoryModal from "../../_component/modal/CategoryModal";
import CategoryTable from "../../_component/CategoryTable/CategoryTable";

const CreateCategory = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Category
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#20b2aa",
            color: "white",
            width: 220,
            height: 40,
            fontWeight: 600,
            fontSize: 16,
          }}
          onClick={() => setOpen(true)}
        >
          Create Category
        </Button>
        <CategoryModal open={open} setOpen={setOpen} />
        <TextField size="small" placeholder="Search Category" />
      </Stack>
      <Box sx={{ mt: 4 }}>
        <CategoryTable />
      </Box>
    </Box>
  );
};

export default CreateCategory;
