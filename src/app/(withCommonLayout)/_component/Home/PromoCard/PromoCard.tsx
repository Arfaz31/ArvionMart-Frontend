"use client";

import { useRouter } from "next/navigation";
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
  padding: theme.spacing(4, 0),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2, 0),
  },
}));

const PromoCardItem = styled(Box)(({ theme }) => ({
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: theme.shadows[2],
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
  height: "100%",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[6],
  },
}));

const PromoImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

const LoadingSkeleton = () => (
  <Grid container spacing={3}>
    {[1, 2, 3, 4].map((item) => (
      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item}>
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
      router.push(`/all-products/${banner.categoryId}`);
    } else if (banner.subcategoryId) {
      router.push(`/all-products/${banner.subcategoryId}`);
    } else if (banner.secondarySubcategoryId) {
      router.push(`/all-products/${banner.secondarySubcategoryId}`);
    } else if (banner.productId) {
      router.push(`/product/${banner.productId}`);
    }
  };

  if (isLoading) {
    return (
      <PromoCardContainer maxWidth="lg">
        <LoadingSkeleton />
      </PromoCardContainer>
    );
  }

  if (error || !promoBanners.length) {
    return (
      <PromoCardContainer maxWidth="lg">
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
    <PromoCardContainer maxWidth="lg">
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginBottom: 4,
          marginTop: 5,
          textAlign: "center",
          fontWeight: 700,
        }}
      >
        Best Deals
      </Typography>
      <Grid container spacing={3}>
        {promoBanners.map((banner) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={banner._id}>
            <PromoCardItem onClick={() => handleCardClick(banner)}>
              <PromoImage
                src={banner.bannerImage}
                alt="Promotional banner"
                loading="lazy"
              />
            </PromoCardItem>
          </Grid>
        ))}
      </Grid>
    </PromoCardContainer>
  );
};

export default PromoCardPage;
