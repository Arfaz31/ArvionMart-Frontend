/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import ProductCard from "../../ProductCard/ProductCard";
import ProductCardSkeleton from "../../AllProduct/ProductCardSekeleton/ProductCardSeketon";

const NewArrivalProduct = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGetAllProductsQuery({
    limit: 10,
    page: 1,
    isActive: true,
    isNewArrival: true,
  });

  const products = data?.data || [];

  const handleViewAll = () => {
    router.push("/all-products");
  };

  return (
    <Box
      sx={{
        paddingBottom: { lg: "100px", xs: "50px" },
        backgroundColor: "#f9f9f9",
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
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              position: "relative",
            }}
          >
            NEW ARRIVALS
          </Typography>
        </Box>

        {isLoading ? (
          <Grid container spacing={4}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }} key={index}>
                <ProductCardSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : error ? (
          <Typography color="error" textAlign="center" py={4}>
            Failed to load new arrival products
          </Typography>
        ) : products.length === 0 ? (
          <Typography textAlign="center" py={4}>
            No new arrival products available
          </Typography>
        ) : (
          <>
            <Grid container spacing={4}>
              {products.map((product: any) => (
                <Grid
                  size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}
                  key={product._id}
                >
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
                View All New Arrivals
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default NewArrivalProduct;
