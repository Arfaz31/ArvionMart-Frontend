/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useGetSubCategoryByCategoryQuery } from "@/redux/features/subcategory/subcategoryApi";
import { useAppSelector } from "@/redux/hook";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Button,
} from "@mui/material";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Search } from "@mui/icons-material";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import ProductCard from "../ProductCard/ProductCard";
import { IProduct } from "@/types/types";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ProductCardSkeleton from "../AllProduct/ProductCardSekeleton/ProductCardSeketon";

interface SubCategory {
  _id: string;
  subcategoryName: string;
}

const ProductGrid = () => {
  const { id, categoryName } = useAppSelector((state) => state.category);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("featured");
  const [value, setValue] = React.useState(0);
  const [page, setPage] = useState(1);

  // Fetch subcategories
  const {
    data: subCategory,
    isLoading: isSubCategoryLoading,
    error: subCategoryError,
  } = useGetSubCategoryByCategoryQuery(id, {
    skip: !id,
  });

  // Fetch products with error handling
  const {
    data: productData,
    isLoading: isProductLoading,
    error: productError,
  } = useGetAllProductsQuery([
    { key: "category", value: categoryName },
    { key: "subcategory", value: activeSubCategory },
    { key: "limit", value: 2 },
    { key: "page", value: page },
  ]);

  // Handle tab click
  const handleTabClick = (subCategoryName: string) => {
    setActiveSubCategory(subCategoryName);
    setPage(1);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Calculate total pages safely
  const totalPages = productData?.meta?.limit
    ? Math.ceil(productData.meta.total / productData.meta.limit)
    : 1;

  // Error states
  if (subCategoryError || productError) {
    return (
      <Container maxWidth="xl">
        <Box py={4} textAlign="center">
          <Typography variant="h6" color="error">
            Error loading data. Please try again later.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Box>
      <Container maxWidth="xl">
        {/* Search and Sort Section */}
        <Box>
          <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, md: 9 }}>
              <Typography variant="body1">Search:</Typography>
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="body1">Sort By:</Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as string)}
                  displayEmpty
                >
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Top Rated</MenuItem>
                  <MenuItem value="newest">Newest First</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Subcategory Tabs */}
        {isSubCategoryLoading ? (
          <Box sx={{ my: 2 }}>
            <Typography>Loading categories...</Typography>
          </Box>
        ) : (
          <Box sx={{ my: 2 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              aria-label="visible arrows tabs example"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  "&.Mui-disabled": { opacity: 0.3 },
                },
              }}
            >
              {subCategory?.data?.map((sub: SubCategory, index: number) => (
                <Tab
                  key={sub._id}
                  label={sub.subcategoryName}
                  onClick={() => handleTabClick(sub.subcategoryName)}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
        )}

        {/* Product Grid */}
        <Box sx={{ minHeight: "110vh" }}>
          <Grid container spacing={4}>
            {isProductLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                  <ProductCardSkeleton />
                </Grid>
              ))
            ) : productData?.data?.length ? (
              productData.data.map((product: IProduct) => (
                <Grid key={product._id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Grid size={{ xs: 12, sm: 6, md: 12 }} py={20}>
                <Typography variant="h6" textAlign="center">
                  No products found
                </Typography>
                <Box textAlign="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ px: 10, py: 1, mt: 2 }}
                  >
                    Try Different Category
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Pagination - Only show if not loading and there are products */}
        {!isProductLoading && productData?.data?.length && (
          <Stack spacing={2} alignItems="center" justifyContent="center" mt={4}>
            <Pagination
              page={page}
              onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                setPage(value);
              }}
              count={totalPages}
              shape="rounded"
              variant="outlined"
            />
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default ProductGrid;
