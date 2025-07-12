"use client";

import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  useMediaQuery,
  Drawer,
  SelectChangeEvent,
} from "@mui/material";
import { KeyboardArrowUp, Menu } from "@mui/icons-material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Sidebar from "../Sidebar/Sidebar";

const ProductToolbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const pathName = usePathname();
  const searchQuery = useSearchParams();

  const sortOptions = [
    { value: "productName", label: "Product Name" },
    { value: "price", label: "Price" },
    { value: "-createdAt", label: "Date Added" },
  ];

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const sortBy = event.target.value;
    const params = new URLSearchParams(searchQuery.toString());
    params.set("sortBy", sortBy);
    router.push(`${pathName}?${params.toString()}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        {isMobile && (
          <IconButton onClick={toggleDrawer(true)}>
            <Menu />
          </IconButton>
        )}
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 300, p: 2 }}>
            <Sidebar toggleDrawer={toggleDrawer} />
          </Box>
        </Drawer>
        <Typography variant="body2" sx={{ color: "#666" }}>
          Products
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
          justifyContent: { xs: "flex-start", sm: "flex-start" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              fontSize: "0.875rem",
            }}
          >
            Sort By
          </Typography>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              displayEmpty
              value={searchQuery.get("sortBy") || "productName"}
              onChange={handleSortChange}
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

        <Tooltip title="Scroll to Top">
          <IconButton
            onClick={scrollToTop}
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
