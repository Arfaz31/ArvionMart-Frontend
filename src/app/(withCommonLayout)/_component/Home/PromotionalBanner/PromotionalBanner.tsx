/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { Box, Container, Skeleton, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetAllPromotionalBannersQuery } from "@/redux/api/promotionalBannerApi";

const BannerContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2, 0),
  },
}));

const BannerImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "300px", // Default height
  objectFit: "cover",
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.01)",
  },
  [theme.breakpoints.down("sm")]: {
    height: "150px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    height: "200px",
  },
  [theme.breakpoints.up("md")]: {
    height: "300px",
  },
}));

const PromotionalBanner = () => {
  const router = useRouter();
  const theme = useTheme();

  const {
    data: bannersData,
    isLoading,
    error,
  } = useGetAllPromotionalBannersQuery({
    limit: 1, // Typically only need one banner at a time
    page: 1,
    isDeleted: false,
  });

  const banners = bannersData?.data || [];

  const handleBannerClick = (banner: {
    _id: string;
    image: string;
    categoryId?: string;
    subcategoryId?: string;
    secondarySubcategoryId?: string;
    productId?: string;
    brandId?: string;
  }) => {
    if (banner.categoryId) {
      router.push(`/all-products/${banner.categoryId}`);
    } else if (banner.subcategoryId) {
      router.push(`/all-products/${banner.subcategoryId}`);
    } else if (banner.secondarySubcategoryId) {
      router.push(`/all-products/${banner.secondarySubcategoryId}`);
    } else if (banner.productId) {
      router.push(`/product/${banner.productId}`);
    } else if (banner.brandId) {
      router.push(`/all-products/${banner.brandId}`);
    }
  };

  if (isLoading) {
    return (
      <BannerContainer maxWidth="lg">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          sx={{
            borderRadius: 2,
            height: { xs: 150, sm: 200, md: 300 },
          }}
        />
      </BannerContainer>
    );
  }

  if (error || banners.length === 0) {
    return (
      <BannerContainer maxWidth="lg">
        <Box
          textAlign="center"
          py={4}
          color="text.secondary"
          sx={{
            backgroundColor: theme.palette.grey[100],
            borderRadius: "12px",
          }}
        >
          No promotional banners available
        </Box>
      </BannerContainer>
    );
  }

  return (
    <BannerContainer
      maxWidth="xl"
      sx={{
        paddingBottom: { lg: "50px", xs: "25px" },
      }}
    >
      {banners.map((banner: any) => (
        <Box key={banner._id} onClick={() => handleBannerClick(banner)}>
          <BannerImage
            src={banner.image}
            alt="Promotional banner"
            loading="lazy"
          />
        </Box>
      ))}
    </BannerContainer>
  );
};

export default PromotionalBanner;
