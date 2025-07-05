"use client";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { setCategoryName } from "@/redux/features/category/CategorySlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ICategory } from "@/types/types";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";

const Sidebar = () => {
  const { data: categories } = useGetCategoriesQuery([
    { key: "fields", value: "categoryName" },
    { key: "sort", value: "createdAt" },
  ]);

  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.category);

  return (
    <Box>
      <Paper variant="outlined" elevation={2} sx={{ p: 3, mb: 3 }}>
        {/* Categories Section */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#B3F3F2",
                width: "100%",
                borderRadius: 1,
                height: "50px",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Categories
              </Typography>
            </Box>
          </Box>
          {categories?.data?.length > 0 && (
            <Box>
              {categories?.data?.map((category: ICategory) => (
                <Box
                  key={category._id}
                  sx={{
                    py: 0.5,
                    px: 2,
                    borderRadius: 1,
                    mb: 0.5,

                    "&:hover": { bgcolor: "#f5f5f5" },
                    cursor: "pointer",
                  }}
                  // onClick={() => setCategoryFilter(category)}
                >
                  <FormGroup>
                    <FormControlLabel
                      onChange={() => {
                        dispatch(
                          setCategoryName({
                            categoryName: category.categoryName,
                            id: category._id,
                          })
                        );
                      }}
                      control={
                        <Checkbox checked={id === category._id} size="small" />
                      }
                      label={category?.categoryName}
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "14px",
                          color: "#333",
                        },
                      }}
                    />
                  </FormGroup>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Brand Section */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              cursor: "pointer",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Brand
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Shoe Size Section */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              cursor: "pointer",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Shoe Size
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Price Range Section */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              cursor: "pointer",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Price Range
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Colors Section */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              cursor: "pointer",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Colors
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#00a39b",
            "&:hover": { bgcolor: "#008a82" },
            py: 1,
          }}
        >
          Apply Filters
        </Button>
      </Paper>
    </Box>
  );
};

export default Sidebar;
