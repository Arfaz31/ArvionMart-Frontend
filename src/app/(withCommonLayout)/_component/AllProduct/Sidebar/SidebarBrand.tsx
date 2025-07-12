"use client";

import { useGetAllBrandsQuery } from "@/redux/api/brandApi";
import { IBrand } from "@/types/types";
import {
  Box,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SidebarBrand = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const { data: brandData } = useGetAllBrandsQuery({});
  console.log(brandData);
  const router = useRouter();
  const pathName = usePathname();
  const searchQuery = useSearchParams();

  const handleCategoryChange = (brandName: string) => {
    setSelectedBrand((prev) => (prev === brandName ? null : brandName));

    const params = new URLSearchParams(searchQuery.toString());
    if (selectedBrand === brandName) {
      params.delete("brand");
    } else {
      params.set("brand", brandName);
      params.set("page", "1");
      params.set("limit", "10");
    }
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          fontSize: "1rem",
          color: "#333",
          mb: 2,
        }}
      >
        Brand
      </Typography>

      <List sx={{ p: 0 }}>
        {brandData?.data?.map((brand: IBrand) => (
          <ListItem key={brand._id} disablePadding>
            <ListItemButton
              sx={{
                py: 0.5,
                px: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onClick={() =>
                handleCategoryChange(brand.brandName.toLowerCase())
              }
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={selectedBrand === brand.brandName.toLowerCase()}
                    sx={{
                      color: "#666",
                      "&.Mui-checked": {
                        color: "#466cee",
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        fontSize: "0.875rem",
                        cursor: "pointer",
                      }}
                    >
                      {brand.brandName}
                    </Typography>
                  </Box>
                }
                sx={{
                  m: 0,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.875rem",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SidebarBrand;
