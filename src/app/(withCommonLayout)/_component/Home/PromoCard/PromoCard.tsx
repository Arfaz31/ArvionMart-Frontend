"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Container,
  Grid,
  useTheme,
  Skeleton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetAllPromotionalCardsQuery } from "@/redux/api/promotionalCardApi";

interface PromoBannerType {
  _id: string;
  bannerImage: string;
  categoryId?: string;
  subcategoryId?: string;
  secondarySubcategoryId?: string;
  productId?: string;
}

const PromoCardContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4, 2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2, 1),
  },
}));

const PromoCardItem = styled(Box)(({ theme }) => ({
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: theme.shadows[2],
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
  height: "100%",
  margin: theme.spacing(1), // Add margin to create space from borders
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[2],
  },
}));

const PromoImage = styled(Box)(() => ({
  width: "100%",
  borderRadius: "12px",
  position: "relative",
  aspectRatio: "4 / 4", // Fixed aspect ratio
  overflow: "hidden", // Ensure the image respects the border radius
}));

const LoadingSkeleton = () => (
  <Grid container spacing={2}>
    {[1, 2, 3, 4].map((item) => (
      <Grid size={{ xs: 6, sm: 6, md: 3 }} key={item}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          sx={{ borderRadius: "12px" }}
        />
      </Grid>
    ))}
  </Grid>
);

const PromoCardPage = () => {
  const router = useRouter();
  const theme = useTheme();

  const {
    data: promoData,
    isLoading,
    error,
  } = useGetAllPromotionalCardsQuery({
    limit: 4,
    page: 1,
  });

  const promoBanners: PromoBannerType[] = promoData?.data || [];

  const handleCardClick = (banner: PromoBannerType) => {
    if (banner.categoryId) {
      router.push(`/${banner.categoryId}`);
    } else if (banner.subcategoryId) {
      router.push(`/${banner.subcategoryId}`);
    } else if (banner.secondarySubcategoryId) {
      router.push(`/${banner.secondarySubcategoryId}`);
    } else if (banner.productId) {
      router.push(`/product/${banner.productId}`);
    }
  };

  if (isLoading) {
    return (
      <PromoCardContainer maxWidth="xl">
        <LoadingSkeleton />
      </PromoCardContainer>
    );
  }

  if (error || !promoBanners.length) {
    return (
      <PromoCardContainer maxWidth="xl">
        <Box
          textAlign="center"
          py={10}
          color="text.secondary"
          sx={{
            backgroundColor: theme.palette.grey[100],
            borderRadius: "12px",
          }}
        >
          No promotional cards available
        </Box>
      </PromoCardContainer>
    );
  }

  return (
    <PromoCardContainer maxWidth="xl">
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          marginBottom: 2,
          marginTop: 0,
          textAlign: "center",
          fontWeight: 700,
          [theme.breakpoints.down("sm")]: {
            fontSize: "1.5rem",
          },
        }}
      >
        Best Deals
      </Typography>
      <Grid container spacing={2}>
        {promoBanners.map((banner) => (
          <Grid size={{ xs: 6, sm: 6, md: 3 }} key={banner._id}>
            <PromoCardItem onClick={() => handleCardClick(banner)}>
              <PromoImage>
                <Image
                  src={banner.bannerImage}
                  alt="Promotional banner"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </PromoImage>
            </PromoCardItem>
          </Grid>
        ))}
      </Grid>
    </PromoCardContainer>
  );
};

export default PromoCardPage;
