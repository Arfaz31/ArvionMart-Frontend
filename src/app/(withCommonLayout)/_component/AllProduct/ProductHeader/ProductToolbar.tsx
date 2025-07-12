"use client";

import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const ProductToolbar = ({
  totalItems = 545,
  currentPage = 1,
  itemsPerPage = 96,
}) => {
  // Calculate display range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const sortOptions = [
    { value: "position", label: "Position" },
    { value: "name", label: "Product Name" },
    { value: "price", label: "Price" },
    { value: "created_at", label: "Date Added" },
    { value: "popularity", label: "Popularity" },
    { value: "rating", label: "Rating" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 2,
        px: { xs: 1, sm: 2 },
        backgroundColor: "#f5f5f5",
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        flexWrap: { xs: "wrap", sm: "nowrap" },
        gap: { xs: 1, sm: 2 },
      }}
    >
      {/* Left side - View toggles and item count */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flex: { xs: "1 1 100%", sm: "1 1 auto" },
          order: { xs: 1, sm: 1 },
        }}
      >
        {/* View Toggle Buttons */}
        <Box
          sx={{
            display: "flex",
            backgroundColor: "white",
            borderRadius: 1,
            overflow: "hidden",
          }}
        ></Box>

        {/* Item Count */}
        <Typography
          variant="body2"
          sx={{
            color: "#666",
            fontSize: { xs: "0.875rem", sm: "0.875rem" },
            whiteSpace: "nowrap",
          }}
        >
          Items {startItem}-{endItem} of {totalItems}
        </Typography>
      </Box>

      {/* Right side - Sort and scroll to top */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flex: { xs: "1 1 auto", sm: "0 0 auto" },
          order: { xs: 2, sm: 2 },
          justifyContent: { xs: "flex-end", sm: "flex-end" },
        }}
      >
        {/* Sort By */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              fontSize: "0.875rem",
              display: { xs: "none", sm: "block" },
            }}
          >
            Sort By
          </Typography>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              displayEmpty
              sx={{
                backgroundColor: "white",
                fontSize: "0.875rem",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e0e0e0",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ff6b35",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ff6b35",
                },
              }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Scroll to Top Button */}
        <Tooltip title="Scroll to Top">
          <IconButton
            size="small"
            sx={{
              backgroundColor: "white",
              border: "1px solid #e0e0e0",
              color: "#666",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                borderColor: "#ff6b35",
              },
            }}
          >
            <KeyboardArrowUp fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ProductToolbar;
