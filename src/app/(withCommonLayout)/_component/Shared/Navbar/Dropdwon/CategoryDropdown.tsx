"use client";

import { Box, Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";

interface ICategory {
  _id: string;
  categoryName: string;
}

const CategoryDropdown = () => {
  const [categoriesAnchor, setCategoriesAnchor] = useState<null | HTMLElement>(
    null
  );

  const { data: category } = useGetCategoriesQuery([
    {
      key: "fields",
      value: "categoryName,subCategory",
    },
  ]);

  const handleCategoriesOpen = (event: React.MouseEvent<HTMLElement>) =>
    setCategoriesAnchor(event.currentTarget);
  const handleCategoriesClose = () => setCategoriesAnchor(null);

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
        Categories
      </Button>
      <Menu
        anchorEl={categoriesAnchor}
        open={categoriesAnchor !== null}
        onClose={handleCategoriesClose}
        keepMounted
      >
        <Box
          sx={{
            width: "300px",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          {category?.data?.map((item: ICategory) => (
            <MenuItem key={item._id} onClick={handleCategoriesClose}>
              {item?.categoryName}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

export default CategoryDropdown;
