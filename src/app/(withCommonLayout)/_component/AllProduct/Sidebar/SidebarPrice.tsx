"use client";

import {
  Box,
  InputAdornment,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SidebarPrice = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchQuery = useSearchParams();
  const [priceRange, setPriceRange] = useState<number[]>([0, 15000]);

  useEffect(() => {
    const params = new URLSearchParams(searchQuery.toString());
    const minPrice = params.get("minPrice");
    const maxPrice = params.get("maxPrice");
    if (minPrice && maxPrice) {
      setPriceRange([Number(minPrice), Number(maxPrice)]);
    }
  }, [searchQuery]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handlePriceChange = () => {
    const params = new URLSearchParams(searchQuery.toString());
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());
    params.set("page", "1");
    params.set("limit", "10");
    router.push(`${pathName}?${params.toString()}`);
  };

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newRange = [...priceRange];
      newRange[index] =
        event.target.value === "" ? 0 : Number(event.target.value);
      setPriceRange(newRange);
    };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          fontSize: "1rem",
          color: "#333",
          mb: 3,
        }}
      >
        Price
      </Typography>

      {/* Price Slider */}
      <Box sx={{ px: 1, mb: 3 }}>
        <Slider
          value={priceRange}
          onChange={handleSliderChange}
          onChangeCommitted={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={15000}
          sx={{
            color: "#466cee",
            "& .MuiSlider-thumb": {
              backgroundColor: "#466cee",
              border: "2px solid #fff",
              boxShadow: "0 0 0 8px rgb(201, 210, 242)",
            },
            "& .MuiSlider-track": {
              backgroundColor: "#466cee",
            },
            "& .MuiSlider-rail": {
              backgroundColor: "#ddd",
            },
          }}
        />
      </Box>

      {/* Price Input Fields */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          size="small"
          variant="outlined"
          value={priceRange[0]}
          onChange={handleInputChange(0)}
          onBlur={handlePriceChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">TK</InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              fontSize: "0.875rem",
              "&.Mui-focused fieldset": {
                borderColor: "#466cee",
              },
            },
          }}
        />

        <Typography
          variant="body2"
          sx={{
            color: "#666",
            fontSize: "0.875rem",
          }}
        >
          -
        </Typography>

        <TextField
          size="small"
          variant="outlined"
          value={priceRange[1]}
          onChange={handleInputChange(1)}
          onBlur={handlePriceChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">TK</InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              fontSize: "0.875rem",
              "&.Mui-focused fieldset": {
                borderColor: "#466cee",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default SidebarPrice;
