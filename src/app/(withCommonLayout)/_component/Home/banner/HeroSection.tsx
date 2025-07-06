/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Theme,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetAllBannersQuery } from "@/redux/api/bannerApi";

interface BannerType {
  _id: string;
  image: string;
  categoryId?: string;
  subcategoryId?: string;
  secondarySubcategoryId?: string;
  productId?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Enhanced styled components
const SliderContainer = styled(Box)(() => ({
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "500px",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  "@media (max-width: 768px)": {
    height: "400px",
    borderRadius: "12px",
  },
}));

const SlideContainer = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  transition: "transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)",
}));

const SlideContent = styled(Box)(() => ({
  minWidth: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  position: "relative",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}));

const Indicator = styled(Box, {
  shouldForwardProp: (prop: string) => prop !== "active",
})<{ active?: boolean }>(({ active }: { active?: boolean; theme: Theme }) => ({
  width: active ? "40px" : "12px",
  height: "12px",
  borderRadius: "6px",
  backgroundColor: active ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
  cursor: "pointer",
  transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
  "&:hover": {
    backgroundColor: active ? "#ffffff" : "rgba(255, 255, 255, 0.8)",
    transform: "scale(1.1)",
  },
}));

const LoadingSkeleton = styled(Box)(() => ({
  width: "100%",
  height: "500px",
  borderRadius: "16px",
  "@media (max-width: 768px)": {
    height: "400px",
  },
}));

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  // Fetch banner data from API
  const {
    data: bannerData,
    isLoading,
    error,
  } = useGetAllBannersQuery({
    limit: 3,
    page: 1,
  });

  const banners: BannerType[] = bannerData?.data || [];

  // Handle banner click navigation
  const handleBannerClick = (banner: BannerType) => {
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

  // Auto-play functionality
  useEffect(() => {
    if (banners.length <= 1) return;

    const play = () => {
      autoPlayRef.current = setTimeout(() => {
        nextSlide();
      }, 5000); // 5 seconds per slide
    };

    play();

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentSlide, banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev: number) =>
      prev === banners.length - 1 ? 0 : prev + 1
    );
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [banners.length]);

  // Loading state
  if (isLoading) {
    return (
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "block",
            md: "block",
            lg: "block",
          },
        }}
      >
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <LoadingSkeleton>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ borderRadius: "16px" }}
            />
          </LoadingSkeleton>
        </Container>
      </Box>
    );
  }

  // Error state
  if (error || !banners.length) {
    return (
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "block",
            md: "block",
            lg: "block",
          },
        }}
      >
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box
            sx={{
              height: "600px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: "16px",
            }}
          >
            <Box sx={{ color: "text.secondary", fontSize: "1.1rem" }}>
              No banners available at the moment
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: {
          xs: "none",
          sm: "block",
          md: "block",
          lg: "block",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <SliderContainer>
          <SlideContainer
            sx={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
            ref={sliderRef}
          >
            {banners.map((banner, index) => (
              <SlideContent
                key={banner._id}
                sx={{
                  backgroundImage: `url(${banner.image})`,
                }}
                onClick={() => handleBannerClick(banner)}
                role="button"
                tabIndex={0}
                aria-label={`Banner ${index + 1}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleBannerClick(banner);
                  }
                }}
              />
            ))}
          </SlideContainer>

          {/* Indicators */}
          {banners.length > 1 && (
            <Box
              sx={{
                position: "absolute",
                bottom: "30px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "12px",
                zIndex: 3,
              }}
            >
              {banners.map((_, index) => (
                <Indicator
                  key={index}
                  active={currentSlide === index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </Box>
          )}

          {/* Navigation arrows for larger screens */}
          {banners.length > 1 && !isMobile && (
            <>
              <Box
                sx={{
                  position: "absolute",
                  left: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 3,
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    transform: "translateY(-50%) scale(1.1)",
                  },
                }}
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev === 0 ? banners.length - 1 : prev - 1
                  )
                }
              >
                <Box sx={{ color: "white", fontSize: "1.5rem" }}>‹</Box>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 3,
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    transform: "translateY(-50%) scale(1.1)",
                  },
                }}
                onClick={nextSlide}
              >
                <Box sx={{ color: "white", fontSize: "1.5rem" }}>›</Box>
              </Box>
            </>
          )}
        </SliderContainer>
      </Container>
    </Box>
  );
};

export default BannerSlider;
