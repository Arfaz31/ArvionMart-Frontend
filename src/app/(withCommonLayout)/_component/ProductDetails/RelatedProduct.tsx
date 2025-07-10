/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useGetRelatedProductQuery } from "@/redux/api/productApi";
import { Box, Typography, Grid } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import ProductCardSkeleton from "../AllProduct/ProductCardSekeleton/ProductCardSeketon";

interface RelatedProductsProps {
  currentProductId: string;
}

const RelatedProduct = ({ currentProductId }: RelatedProductsProps) => {
  const { data, isLoading, error } =
    useGetRelatedProductQuery(currentProductId);

  const relatedProducts = data?.data || [];

  return (
    <Box sx={{ mt: 8 }}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 4,
          position: "relative",
          "&:after": {
            content: '""',
            position: "absolute",
            bottom: -8,
            left: 0,
            width: "80px",
            height: "4px",
            background: "linear-gradient(135deg, #1565c0 0%, #5648d6 100%)",
            borderRadius: "2px",
          },
        }}
      >
        Related Products
      </Typography>

      {isLoading ? (
        <Grid container spacing={4} columns={12}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid key={index} size={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 3 }}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Typography color="error" textAlign="center" py={4}>
          Failed to load products
        </Typography>
      ) : relatedProducts.length === 0 ? (
        <Typography textAlign="center" py={4}>
          No related products available
        </Typography>
      ) : (
        <>
          <Grid container spacing={2} columns={12}>
            {relatedProducts
              .filter((product: any) => product?.variant?.[0]?.image?.[0])
              .map((product: any) => (
                <Grid
                  key={product._id}
                  size={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 3 }}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default RelatedProduct;
