"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useGetAllBrandsQuery } from "@/redux/api/brandApi";

import Image from "next/image";
import { IBrand } from "@/types/types";

const BrandPage = () => {
  const router = useRouter();
  const { data: brandsData, isLoading, error } = useGetAllBrandsQuery({});

  const handleBrandClick = (brandname: string) => {
    const baseUrl = "/product";
    const params = new URLSearchParams();
    params.set("brand", brandname.toLowerCase());
    params.set("page", "1");
    params.set("limit", "10");
    const finalPath = `${baseUrl}?${params.toString()}`;
    router.push(finalPath);
  };

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error">
          Failed to load brands. Please try again later.
        </Alert>
      </Container>
    );
  }

  const brands = brandsData?.data || [];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 600, color: "#333" }}
          >
            All Brands
          </Typography>

          <Breadcrumbs separator="/" sx={{ color: "#666" }}>
            <Link
              href="/"
              underline="hover"
              color="inherit"
              sx={{ cursor: "pointer" }}
            >
              Home
            </Link>
            <Typography color="text.primary" sx={{ fontWeight: 500 }}>
              All Brands
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Brands Grid */}
      <Grid container spacing={3}>
        {brands.map((brand: IBrand & { _id: string }) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={brand._id}>
            <Card
              sx={{
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                height: "100%",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  borderColor: "#1976d2",
                },
              }}
              onClick={() => handleBrandClick(brand.brandName)}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                  height: "160px",
                  textAlign: "center",
                }}
              >
                {/* Brand Logo */}
                <Box
                  sx={{
                    mb: 2,
                    width: 80,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {brand.brandLogo ? (
                    <Image
                      src={brand.brandLogo}
                      alt={brand.brandName}
                      width={80}
                      height={60}
                      style={{
                        objectFit: "contain",
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 80,
                        height: 60,
                        backgroundColor: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 1,
                        color: "#666",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                      }}
                    >
                      {brand.brandName.charAt(0).toUpperCase()}
                    </Box>
                  )}
                </Box>

                {/* Brand Name */}
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 500,
                    color: "#333",
                    fontSize: "1rem",
                    lineHeight: 1.2,
                  }}
                >
                  {brand.brandName}
                </Typography>

                {/* Status Indicator */}
                {brand.status === "INACTIVE" && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#f44336",
                      fontSize: "0.75rem",
                      mt: 0.5,
                    }}
                  >
                    Inactive
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {brands.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "#666", mb: 2 }}>
            No brands found
          </Typography>
          <Typography variant="body2" sx={{ color: "#999" }}>
            Brands will appear here once they are added to the system.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default BrandPage;
