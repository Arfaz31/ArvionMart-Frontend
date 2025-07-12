/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useRef } from "react";
import { Box, IconButton, Chip, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import Image from "next/image";

// Import LightGallery CSS
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-fullscreen.css";

interface IProps {
  product: any;
}

export default function ProductGallery({ product }: IProps) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const lightGalleryRef = useRef<any>(null);

  const activeVariant = useMemo(() => {
    return product?.variant?.[activeVariantIndex] || {};
  }, [product, activeVariantIndex]);

  const images = useMemo(() => {
    return activeVariant?.image || [];
  }, [activeVariant]);

  const handlePrev = () => {
    setMainImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setMainImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleVariantChange = (index: number) => {
    setActiveVariantIndex(index);
    setMainImageIndex(0);
  };

  const openLightGallery = () => {
    if (lightGalleryRef.current) {
      lightGalleryRef.current.openGallery(mainImageIndex);
    }
  };

  if (!images.length) return null;

  return (
    <Box sx={{ position: "relative", height: "fit-content" }}>
      {/* LightGallery Component */}
      <LightGallery
        onInit={(detail) => {
          lightGalleryRef.current = detail.instance;
        }}
        speed={500}
        plugins={[lgThumbnail, lgZoom, lgFullscreen]}
        dynamic
        dynamicEl={images.map((img: string) => ({
          src: img,
          thumb: img,
          subHtml: `<h4>${product.productName}</h4>`,
        }))}
      />

      {/* Main Image Container */}
      <Box
        sx={{
          mb: 2,
          position: "relative",
          aspectRatio: "1/1",
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          overflow: "hidden",
          cursor: "zoom-in",
        }}
        onClick={openLightGallery}
      >
        <Image
          src={images[mainImageIndex]}
          alt={product.productName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          style={{ objectFit: "cover" }}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              sx={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                width: 40,
                height: 40,
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              sx={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                width: 40,
                height: 40,
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              }}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}
      </Box>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            py: 1,
            "&::-webkit-scrollbar": {
              height: 4,
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
              borderRadius: 2,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: 2,
            },
          }}
        >
          {images.map((img: string, index: number) => (
            <Box
              key={`thumb-${index}`}
              onClick={() => setMainImageIndex(index)}
              sx={{
                width: 90,
                height: 90,
                position: "relative",
                cursor: "pointer",
                border:
                  mainImageIndex === index
                    ? "2px solid #1565c0"
                    : "1px solid #e0e0e0",
                borderRadius: 1,
                overflow: "hidden",
                flexShrink: 0,
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#1565c0",
                  transform: "scale(1.05)",
                },
              }}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="60px"
                style={{ objectFit: "cover" }}
              />
            </Box>
          ))}
        </Box>
      )}

      {/* Variant Selectors */}
      {product.variant?.length > 1 && (
        <Box sx={{ mt: 3 }}>
          {product.variant[0]?.color && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ typography: "subtitle1", mb: 1, fontWeight: 600 }}>
                Color
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {product.variant.map((variant: any, index: number) => (
                  <Chip
                    key={`color-${index}`}
                    label={variant.color}
                    onClick={() => handleVariantChange(index)}
                    sx={{
                      bgcolor:
                        activeVariantIndex === index ? "#1565c0" : "grey.200",
                      color:
                        activeVariantIndex === index ? "white" : "text.primary",
                      minWidth: 80,
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor:
                          activeVariantIndex === index ? "#1565c0" : "grey.300",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {product.variant[0]?.size && (
            <Box>
              <Box sx={{ typography: "subtitle1", mb: 1, fontWeight: 600 }}>
                Size
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {product.variant.map((variant: any, index: number) => (
                  <Chip
                    key={`size-${index}`}
                    label={variant.size}
                    onClick={() => handleVariantChange(index)}
                    sx={{
                      bgcolor:
                        activeVariantIndex === index ? "#1565c0" : "grey.200",
                      color:
                        activeVariantIndex === index ? "white" : "text.primary",
                      minWidth: 60,
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor:
                          activeVariantIndex === index ? "#1565c0" : "grey.300",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
