"use client";

import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Image from "next/image";

// Import your banner images
import bannarpromo from "@/assests/allProducts/pr-banner.png";
// Add more banner images as needed
import banner2 from "@/assests/allProducts/banner-2.png"; // Add your second banner

const ProductHeader = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Array of banner images - replace with your actual banner images
  const banners = [
    {
      src: bannarpromo,
      alt: "Promo Banner 1",
    },
    {
      src: banner2,
      alt: "Promo Banner 2",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <Box
      sx={{
        position: "relative",
        mb: 4,
        borderRadius: 1,
        border: "1px solid #e0e0e0",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carousel Container */}
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {banners.map((banner, index) => (
          <Box
            key={index}
            sx={{
              minWidth: "100%",
              position: "relative",
            }}
          >
            <Image
              src={banner.src}
              alt={banner.alt}
              width={1000}
              height={300}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Previous Button */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: "absolute",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          zIndex: 2,
        }}
      >
        <ChevronLeft />
      </IconButton>

      {/* Next Button */}
      <IconButton
        onClick={nextSlide}
        sx={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          zIndex: 2,
        }}
      >
        <ChevronRight />
      </IconButton>

      {/* Dot Indicators */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          zIndex: 2,
        }}
      >
        {banners.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor:
                currentSlide === index ? "white" : "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductHeader;
