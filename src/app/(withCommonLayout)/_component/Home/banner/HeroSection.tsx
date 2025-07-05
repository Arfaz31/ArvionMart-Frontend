/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  // IconButton,
  useTheme,
  useMediaQuery,
  Theme,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { styled } from "@mui/material/styles";

interface SlideType {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  backgroundColor: string;
  accentColor: string;
}

// Enhanced styled components

const SlideContainer = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  transition: "transform 0.6s cubic-bezier(0.45, 0, 0.2, 1)",
}));

const SlideContent = styled(Box)(() => ({
  minWidth: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  position: "relative",
}));

const SlideImage = styled(Box)(() => ({
  width: "60%",
  height: "100%",
  position: "relative",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  transition: "transform 0.5s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const ContentOverlay = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  position: "relative",
  zIndex: 2,
}));

const Indicator = styled(Box, {
  shouldForwardProp: (prop: string) => prop !== "active",
})<{ active?: boolean }>(
  ({ active, theme }: { active?: boolean; theme: Theme }) => ({
    width: active ? "32px" : "12px",
    height: "12px",
    borderRadius: "6px",
    backgroundColor: active ? theme.palette.primary.main : "rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  })
);

const ActionButton = styled(Button)(() => ({
  padding: "12px 32px",
  borderRadius: "30px",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
  },
}));

const TextHighlight = styled("span")(({ theme }: { theme: Theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

const BadgeLabel = styled(Box)(() => ({
  display: "inline-block",
  backgroundColor: "#FF5722",
  color: "white",
  padding: "6px 12px",
  borderRadius: "20px",
  fontWeight: 600,
  fontSize: "0.875rem",
  marginBottom: "12px",
  boxShadow: "0px 2px 8px rgba(255, 87, 34, 0.3)",
}));

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"));
  // const isExtraLarge = useMediaQuery(theme.breakpoints.down("xl"));
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const slides: SlideType[] = [
    {
      image:
        "https://res.cloudinary.com/dnom0fr0x/image/upload/v1744882848/wf24cp7kfsr-1744882848177-image-teal-shoes.png",
      badge: "NEW ARRIVALS",
      title: "Premium Sport Collection 2025",
      subtitle: "Elevate your performance with cutting-edge design",
      description:
        "Experience unmatched comfort and style with our latest performance collection.",
      buttonText: "Shop Collection",
      backgroundColor: "#F6F9FC",
      accentColor: "#00B8A9",
    },
    {
      image:
        "https://res.cloudinary.com/dnom0fr0x/image/upload/v1744881215/5wtna5ze7o3-1744881215180-image-shoes-removebg-preview.png",
      badge: "TRENDING",
      title: "Running Excellence Series",
      subtitle: "Up to 40% off premium running shoes",
      description:
        "Engineered for marathon runners and everyday athletes seeking performance.",
      buttonText: "Explore Now",
      backgroundColor: "#F0F7FF",
      accentColor: "#3D5AFE",
    },
    {
      image:
        "https://res.cloudinary.com/dnom0fr0x/image/upload/v1744883505/ang2hkq7rvk-1744883504947-image-orage-removebg-preview.png",
      badge: "LIMITED EDITION",
      title: "Exclusive Designer Collaboration",
      subtitle: "Luxury meets performance",
      description:
        "Our signature collection crafted with premium materials and innovative technology.",
      buttonText: "View Collection",
      backgroundColor: "#FFF8E1",
      accentColor: "#FF6F00",
    },
  ];

  useEffect(() => {
    const play = () => {
      autoPlayRef.current = setTimeout(() => {
        nextSlide();
      }, 10000);
    };

    play();

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev: number) =>
      prev === slides.length - 1 ? 0 : prev + 1
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
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <SlideContainer
          sx={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
          ref={sliderRef}
        >
          {slides.map((slide, index) => (
            <SlideContent key={index}>
              <ContentOverlay sx={{ backgroundColor: slide.backgroundColor }}>
                <Container maxWidth="xl">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: isMobile ? "column-reverse" : "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                      padding: isMobile ? "30px 0" : 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: isMobile ? "100%" : "40%",
                        height: isMobile ? "auto" : "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: isMobile ? "center" : "flex-start",
                        textAlign: isMobile ? "center" : "left",
                        padding: isMobile
                          ? "20px 16px 40px"
                          : isLarge
                          ? "0 0 0 10px"
                          : "0 0 0 0px",
                        zIndex: 5,
                      }}
                    >
                      <BadgeLabel sx={{ backgroundColor: slide.accentColor }}>
                        {slide.badge}
                      </BadgeLabel>

                      <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                          fontWeight: 800,
                          fontSize: isMobile
                            ? "2rem"
                            : isMedium
                            ? "2.4rem"
                            : "3rem",
                          color: "#212121",
                          lineHeight: 1.1,
                          marginBottom: "16px",
                          fontFamily: '"Montserrat", sans-serif',
                          width: isMobile ? "100%" : "100%",
                        }}
                      >
                        {slide?.title}
                      </Typography>

                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                          color: "#424242",
                          fontSize: isMobile ? "1.1rem" : "1.25rem",
                          letterSpacing: "0.5px",
                          fontWeight: 500,
                          marginBottom: "12px",
                        }}
                      >
                        <TextHighlight>{slide?.subtitle}</TextHighlight>
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: "#616161",
                          marginBottom: "24px",
                          maxWidth: "440px",
                          display: isMobile ? "none" : "block",
                        }}
                      >
                        {slide?.description}
                      </Typography>

                      <ActionButton
                        variant="contained"
                        size="large"
                        startIcon={<LocalMallIcon />}
                        sx={{
                          backgroundColor: slide.accentColor,
                          "&:hover": {
                            backgroundColor: slide.accentColor,
                            filter: "brightness(90%)",
                          },
                        }}
                      >
                        {slide?.buttonText}
                      </ActionButton>
                    </Box>

                    <Box
                      sx={{
                        width: isMobile ? "80%" : "60%",
                        height: isMobile ? "250px" : "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <SlideImage
                        sx={{
                          backgroundImage: `url(${slide.image})`,
                          height: isMedium ? "500px" : "600px",
                          width: "100%",
                        }}
                      />
                      {/* Decorative circle */}
                    </Box>
                  </Box>
                </Container>
              </ContentOverlay>
            </SlideContent>
          ))}
        </SlideContainer>

        <Box
          sx={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            zIndex: 3,
          }}
        >
          {slides.map((_, index) => (
            <Indicator
              key={index}
              active={currentSlide === index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              sx={{
                backgroundColor:
                  currentSlide === index
                    ? slides[currentSlide].accentColor
                    : "rgba(0, 0, 0, 0.2)",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
