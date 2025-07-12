"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CategoryModal from "../../_component/modal/CategoryModal";
import CategoryTable from "../../_component/CategoryTable/CategoryTable";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import useDebounce from "@/hooks/useDebounce";
import Loading from "@/Component/Loading/Loading";

const CreateCategory = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 600);

  const { data, isLoading, isError } = useGetCategoriesQuery({
    searchTerm: debouncedSearchTerm,
  });

  const categories = data?.data || [];
  const meta = data?.meta || {};

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Box>
        <Typography color="error">Error loading categories</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Category Management
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            color: "white",
            width: 220,
            height: 40,
            fontWeight: 600,
            fontSize: 16,
            background: "linear-gradient(135deg, #1565c0 0%, #5648d6 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #0d47a1 0%, #4527a0 100%)",
              boxShadow: "0 4px 12px rgba(86, 72, 214, 0.3)",
            },
          }}
          onClick={() => setOpen(true)}
        >
          Create Category
        </Button>
        <CategoryModal open={open} setOpen={setOpen} />
        <TextField
          size="small"
          placeholder="Search Category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
      </Stack>
      <Box sx={{ mt: 4 }}>
        <CategoryTable categories={categories} meta={meta} />
      </Box>
    </Box>
  );
};

export default CreateCategory;
