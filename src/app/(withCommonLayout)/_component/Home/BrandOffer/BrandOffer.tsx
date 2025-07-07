/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetTopBrandOffersQuery } from "@/redux/api/brandOfferApi";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

import { useRouter } from "next/navigation";
import LoadingForBrandOffer from "./LoadingForBrandOffer";

const BrandOffer = () => {
  const { data: brandOffers, isLoading } = useGetTopBrandOffersQuery("");
  const router = useRouter();

  const handleBrandClick = (brandOffer: any) => {
    // Navigate to brand page if brandId exists, otherwise to product page
    if (brandOffer.brandId?._id) {
      router.push(`/all-products/${brandOffer.brandId._id}`);
    } else if (brandOffer.productId?._id) {
      router.push(`/product/${brandOffer.productId._id}`);
    }
  };

  return (
    <Box
      sx={{
        marginTop: { lg: "20px", xs: "50px" },
        paddingBottom: { lg: "20px", xs: "50px" },
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
            Top Brands & Offers
          </Typography>
        </Box>

        {isLoading ? (
          <LoadingForBrandOffer />
        ) : (
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  lg: "repeat(3, 1fr)",
                  md: "repeat(3, 1fr)",
                  sm: "repeat(2, 1fr)",
                  xs: "repeat(1, 1fr)",
                },
                gap: { lg: 3, md: 2.5, xs: 2 },
              }}
            >
              {brandOffers?.data?.map((brandOffer: any) => (
                <Box
                  key={brandOffer._id}
                  onClick={() => handleBrandClick(brandOffer)}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "15px",
                    cursor: "pointer",
                    height: { lg: "280px", md: "250px", xs: "220px" },
                    "&:hover": {
                      transform: "translateY(-5px)",
                      transition: "all 0.3s ease",
                      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
                    },
                    "&:hover img": {
                      transform: "scale(1.05)",
                      transition: "transform 0.3s ease",
                    },
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Image
                    src={brandOffer.image}
                    alt={brandOffer.name}
                    fill
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BrandOffer;
