/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import ProductCard from "../../ProductCard/ProductCard";
import ProductCardSkeleton from "../../AllProduct/ProductCardSekeleton/ProductCardSeketon";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

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
        paddingBottom: { lg: "50px", xs: "80px" },
        backgroundColor: "#f9f9f9",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            gap: 2,
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
              fontSize: { xs: "h6", sm: "h5", md: "h4" },
            }}
          >
            New Arrivals
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="text"
              onClick={handleViewAll}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                px: 3,
                display: "flex",
              }}
            >
              View All
              <ArrowOutwardIcon sx={{ ml: 1 }} />
            </Button>
          </Box>
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
            <Grid container spacing={2} columns={12}>
              {products
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
      </Container>
    </Box>
  );
};

export default NewArrivalProduct;
