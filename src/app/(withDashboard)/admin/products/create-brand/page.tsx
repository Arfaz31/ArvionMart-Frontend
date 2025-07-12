"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import BrandModal from "../../_component/modal/BrandModal";
import { useState } from "react";
import BrandTable from "../../_component/BrandTable/BrandTable";
import { useGetAllBrandsQuery } from "@/redux/api/brandApi";
import useDebounce from "@/hooks/useDebounce";
import Loading from "@/Component/Loading/Loading";

const CreateBrand = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 600);

  const { data, isLoading, isError } = useGetAllBrandsQuery({
    searchTerm: debouncedSearchTerm,
  });

  const brands = data?.data || [];
  const meta = data?.meta || {};

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Box>
        <Typography color="error">Error loading brands</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Brand Management
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #1565c0 0%, #5648d6 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #0d47a1 0%, #4527a0 100%)",
              boxShadow: "0 4px 12px rgba(86, 72, 214, 0.3)",
            },
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
        <TextField
          size="small"
          placeholder="Search Brand"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
      </Stack>
      <Box sx={{ mt: 4 }}>
        <BrandTable brands={brands} meta={meta} />
      </Box>
    </Box>
  );
};

export default CreateBrand;
