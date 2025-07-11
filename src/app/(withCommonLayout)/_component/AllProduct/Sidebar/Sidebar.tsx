"use client";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Slider,
  TextField,
  InputAdornment,
  Paper,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";

const Sidebar = () => {
  const categories = [
    { name: "Body Soap", count: 37 },
    { name: "Face Wash", count: 169 },
    { name: "Face Mask", count: 21 },
    { name: "Toner", count: 39 },
    { name: "Face & Body Scrubs", count: 66 },
    { name: "Shower Gel & Cream", count: 163 },
    { name: "Hand Wash & Sanitizer", count: 8 },
    { name: "Talcum Powder", count: 17 },
  ];

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
          CATEGORY
        </Typography>

        <List sx={{ p: 0 }}>
          {categories.map((category, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  py: 0.5,
                  px: 0,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      sx={{
                        color: "#666",
                        "&.Mui-checked": {
                          color: "#ff6b6b",
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
                        {category.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#999",
                          fontSize: "0.875rem",
                        }}
                      >
                        ({category.count})
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

      {/* Price Section */}
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
          PRICE
        </Typography>

        {/* Price Slider */}
        <Box sx={{ px: 1, mb: 3 }}>
          <Slider
            valueLabelDisplay="auto"
            min={0}
            max={15000}
            sx={{
              color: "#ff6b6b",
              "& .MuiSlider-thumb": {
                backgroundColor: "#ff6b6b",
                border: "2px solid #fff",
                boxShadow: "0 0 0 8px rgba(255, 107, 107, 0.16)",
              },
              "& .MuiSlider-track": {
                backgroundColor: "#ff6b6b",
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
                  borderColor: "#ff6b6b",
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
                  borderColor: "#ff6b6b",
                },
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default Sidebar;
