"use client";

import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";

const slides = [
  {
    image:
      "https://res.cloudinary.com/dufs2ywc7/image/upload/v1744797323/stylish-modern-sneaker-design-white-gray-black-red-teal-accents-thick-sole-casual-footwear-trendy-shoe_l7ki5d.png",
    badge: "NEW ARRIVALS",
    title: "Premium Sport Collection 2025",
    subtitle: "Elevate your performance",
    description:
      "Experience unmatched comfort and style with our latest performance collection.",
    buttonText: "Shop Collection",
    backgroundColor: "#F6F9FC",
    accentColor: "#00B8A9",
  },
  {
    image:
      "https://res.cloudinary.com/dufs2ywc7/image/upload/v1744797323/stylish-modern-sneaker-design-white-gray-black-red-teal-accents-thick-sole-casual-footwear-trendy-shoe_l7ki5d.png",
    badge: "TRENDING",
    title: "Running Excellence Series",
    subtitle: "Up to 40% off premium ",
    description:
      "Engineered for marathon runners and everyday athletes seeking performance.",
    buttonText: "Explore Now",
    backgroundColor: "#F0F7FF",
    accentColor: "#3D5AFE",
  },
  {
    image:
      "https://res.cloudinary.com/dufs2ywc7/image/upload/v1744797323/stylish-modern-sneaker-design-white-gray-black-red-teal-accents-thick-sole-casual-footwear-trendy-shoe_l7ki5d.png",
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

const HeroFromMobile = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    autoPlayRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentSlide]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  return (
    <Box
      sx={{
        padding: "8px",
      }}
    >
      <Box
        sx={{
          display: { xs: "block", sm: "none", md: "none" },
          position: "relative",
          height: "150px",
          overflow: "hidden",
          borderRadius: 2,
          bgcolor: slides[currentSlide].backgroundColor,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: "transform 0.5s ease",
          }}
        >
          {slides.map((slide, index) => (
            <Box
              key={index}
              minWidth="100%"
              height="100%"
              sx={{
                paddingTop: "20px",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              {/* <Box textAlign="center" mb={2}>
              <Box
                component="span"
                sx={{
                  bgcolor: slide.accentColor,
                  color: "white",
                  px: 2,
                  py: 1,
                  borderRadius: 20,
                  fontWeight: 600,
                  display: "inline-block",
                }}
              >
                {slide.badge}
              </Box>
            </Box> */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="body1" color="text.secondary" mb={3}>
                    {slide.subtitle}
                  </Typography>
                  <Button
                    sx={{
                      width: "95px",
                      height: "30px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontSize: "9px", fontWeight: 600, color: "white" }}
                    >
                      Shop Now
                    </Typography>
                  </Button>
                </Box>
                <Box>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={120}
                    height={120}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Indicators */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => handleSlideChange(index)}
              sx={{
                width: currentSlide === index ? 8 : 6,
                height: 6,
                borderRadius: 3,
                bgcolor:
                  currentSlide === index
                    ? slides[currentSlide].accentColor
                    : "rgba(0,0,0,0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HeroFromMobile;
