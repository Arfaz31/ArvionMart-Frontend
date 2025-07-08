/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import ProductCard from "../../ProductCard/ProductCard";
import ProductCardSkeleton from "../../AllProduct/ProductCardSekeleton/ProductCardSeketon";

const FeatureProduct = () => {
  const router = useRouter();

  const { data, isLoading, error } = useGetAllProductsQuery({
    limit: 10,
    page: 1,
    isActive: true,
    isNewArrival: false,
  });

  const products = data?.data || [];

  const handleViewAll = () => {
    router.push("/all-products");
  };

  return (
    <Box
      sx={{
        marginTop: { lg: "50px", xs: "25px" },
        paddingBottom: { lg: "50px", xs: "25px" },
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 700,
              position: "relative",
              fontSize: { xs: "h5", md: "h4" },
            }}
          >
            Featured Products
          </Typography>
        </Box>

        {isLoading ? (
          <Grid container spacing={4} columns={12}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Grid key={index} size={{xs:6, sm:6,md:6,lg:4 ,xl:3}} >
                <ProductCardSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : error ? (
          <Typography color="error" textAlign="center" py={4}>
            Failed to load products
          </Typography>
        ) : products.length === 0 ? (
          <Typography textAlign="center" py={4}>
            No featured products available
          </Typography>
        ) : (
          <>
            <Grid container spacing={4} columns={12}>
              {products
                .filter(
                  (product: any) =>
                    product?.variant?.[0]?.image?.[0]
                )
                .map((product: any) => (
                  <Grid  key={product._id} size={{xs:6, sm:6,md:6,lg:4 ,xl:3}} >
                    <ProductCard product={product} />
                  </Grid>
                ))}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleViewAll}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                }}
              >
                View All Products
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default FeatureProduct;
