"use client";

import { Box, Button, Menu, MenuItem, CircularProgress } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";

interface ICategory {
  _id: string;
  categoryName: string;
}

const CategoryDropdown = () => {
  const [categoriesAnchor, setCategoriesAnchor] = useState<null | HTMLElement>(
    null
  );

  const router = useRouter();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery("");

  const handleCategoriesOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCategoriesAnchor(event.currentTarget);
  };

  const handleCategoriesClose = () => {
    setCategoriesAnchor(null);
  };

  const handleCategoryClick = (categoryName: string) => {
    const baseUrl = "/product";
    const params = new URLSearchParams();
    params.set("category", categoryName.toLowerCase());
    params.set("page", "1");
    params.set("limit", "10");
    const finalPath = `${baseUrl}?${params.toString()}`;
    router.push(finalPath);
    handleCategoriesClose();
  };

  return (
    <Box>
      <Button
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleCategoriesOpen}
        sx={{
          color: "#333",
          mx: 1.5,
          textTransform: "none",
          fontWeight: 500,
          "&:hover": { bgcolor: "transparent", color: "#666" },
        }}
        variant="text"
      >
        All Categories
      </Button>

      <Menu
        anchorEl={categoriesAnchor}
        open={Boolean(categoriesAnchor)}
        onClose={handleCategoriesClose}
        PaperProps={{
          sx: {
            width: "280px",
            maxHeight: "400px",
            overflow: "auto",
            mt: 1,
          },
        }}
      >
        {categoriesLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          categories?.data?.map((category: ICategory) => (
            <MenuItem
              key={category._id}
              onClick={() => handleCategoryClick(category.categoryName)}
              sx={{
                padding: "12px 16px",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
            >
              {category.categoryName}
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};

export default CategoryDropdown;
