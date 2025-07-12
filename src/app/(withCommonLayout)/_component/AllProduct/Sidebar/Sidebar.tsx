"use client";

import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { ICategory } from "@/types/types";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import SidebarBrand from "./SidebarBrand";
import SidebarPrice from "./SidebarPrice";

const Sidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: categories } = useGetCategoriesQuery({});
  const router = useRouter();
  const pathName = usePathname();
  const searchQuery = useSearchParams();

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory((prev) =>
      prev === categoryName ? null : categoryName
    );

    const params = new URLSearchParams(searchQuery.toString());
    if (selectedCategory === categoryName) {
      params.delete("category");
    } else {
      params.set("category", categoryName);
      params.set("page", "1");
      params.set("limit", "10");
    }
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        maxWidth: 300,
        backgroundColor: "white",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#466cee",
          color: "white",
          py: 2,
          px: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            letterSpacing: "0.5px",
          }}
        >
          FILTER PRODUCTS BY
        </Typography>
      </Box>

      {/* Category Section */}
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
          Category
        </Typography>

        <List sx={{ p: 0 }}>
          {categories?.data?.map((category: ICategory) => (
            <ListItem key={category._id} disablePadding>
              <ListItemButton
                sx={{
                  py: 0.5,
                  px: 0,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                onClick={() =>
                  handleCategoryChange(category.categoryName.toLowerCase())
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={
                        selectedCategory === category.categoryName.toLowerCase()
                      }
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
                        {category.categoryName.toLowerCase()}
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

      <Divider />

      <Box>
        <SidebarBrand />
      </Box>

      <Divider />

      {/* Price Section */}
      <SidebarPrice />
    </Paper>
  );
};

export default Sidebar;
