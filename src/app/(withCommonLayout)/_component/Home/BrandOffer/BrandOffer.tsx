
"use client";

import { useGetTopBrandOffersQuery } from "@/redux/api/brandOfferApi";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingForBrandOffer from "./LoadingForBrandOffer";
import { theme } from "@/lib/theme/theme";

interface IBrandOffer {
  _id: string;
  name: string;
  image: string;
  brandId?: {
    _id: string;
  };
  productId?: {
    _id: string;
  };
}

const BrandOffer = () => {
  const { data: brandOffers, isLoading, error } = useGetTopBrandOffersQuery("");
  const router = useRouter();

  const handleBrandClick = (brandOffer: IBrandOffer) => {
    if (brandOffer.brandId?._id) {
      router.push(`/all-products/${brandOffer.brandId._id}`);
    } else if (brandOffer.productId?._id) {
      router.push(`/product/${brandOffer.productId._id}`);
    }
  };

  return (
    <Box
      sx={{
        marginTop: { lg: "5px", xs: "5px" },
        paddingBottom: { lg: "10px", xs: "25px" },
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 700,
              position: "relative",
              fontSize: { xs: "h5", sm: "h5", md: "h4" },
            }}
          >
            Top Brands & Offers
          </Typography>
        </Box>

        {isLoading ? (
          <LoadingForBrandOffer />
        ) : error || !brandOffers?.data?.length ? (
          <Box
              textAlign="center"
              py={4}
              color="text.secondary"
              sx={{
                backgroundColor: theme.palette.grey[100],
                borderRadius: "12px",
                fontSize: "0.9rem",
              }}
            >
              No brand offers available
            </Box>
        ) : (
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
            {brandOffers.data.map((brandOffer: IBrandOffer) => (
              <Box
                key={brandOffer._id}
                onClick={() => handleBrandClick(brandOffer)}
                sx={{
                  position: "relative",
                  // height: "200px", // Removed fixed height
                  aspectRatio: "4 / 2", // Fixed aspect ratio
                  overflow: "hidden",
                  borderRadius: "8px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={brandOffer.image || "/placeholder.jpg"}
                  alt={brandOffer.name || "Brand Offer"}
                  fill
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BrandOffer;
