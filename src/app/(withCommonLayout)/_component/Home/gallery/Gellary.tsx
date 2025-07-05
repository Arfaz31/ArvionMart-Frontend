// components/Gallery/Gallery.tsx
"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  shoeName: string;
  shoePrice: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1565953198075-db265882ee68?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Model wearing leather oxford shoes",
    shoeName: "Classic Oxford",
    shoePrice: "$129.99",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1649503376979-25d9ce7df3ea?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Model wearing white sneakers",
    shoeName: "Urban Sneakers",
    shoePrice: "$89.99",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1667686952557-292df7f2e0df?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Model wearing black boots",
    shoeName: "Winter Boots",
    shoePrice: "$159.99",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1559334417-01b38aec66bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Model wearing sandals",
    shoeName: "Summer Sandals",
    shoePrice: "$49.99",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1732708867249-03d3e6280d8c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Model wearing running shoes",
    shoeName: "Performance Runners",
    shoePrice: "$119.99",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1732708875657-814b6a6fd8fe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Model wearing casual loafers",
    shoeName: "Casual Loafers",
    shoePrice: "$79.99",
  },
];

const Gallery: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const openLightbox = useCallback((index: number) => {
    setImageIndex(index);
    setOpen(true);
  }, []);

  const closeLightbox = () => {
    setOpen(false);
  };

  const slides = galleryImages.map(({ src, alt }) => ({
    src,
    alt,
  }));

  return (
    <Container>
      {" "}
      <Box sx={{ py: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{
            mb: 4,
            fontWeight: "bold",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              width: "60px",
              height: "3px",
              background: theme.palette.primary.main,
              bottom: "-10px",
              left: "calc(50% - 30px)",
            },
          }}
        >
          Our Gallery
        </Typography>

        <Grid container>
          {galleryImages.map((image, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={image.id}>
              <Box
                onClick={() => openLightbox(index)}
                sx={{
                  position: "relative",
                  height: { xs: "300px", md: "630px" },
                  overflow: "hidden",
                  borderRadius: "0px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 20px rgba(0,0,0,0.15)",
                  },
                  "&:hover .overlay": {
                    opacity: 1,
                  },
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  sizes="width: 100%"
                  priority={index < 4}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    padding: 2,
                    color: "white",
                    opacity: 0.9,
                    transition: "opacity 0.3s ease",
                  }}
                ></Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Lightbox
          open={open}
          close={closeLightbox}
          slides={slides}
          index={imageIndex}
          plugins={[Zoom, Thumbnails, Slideshow]}
          slideshow={{ autoplay: true, delay: 5000 }}
          carousel={{ finite: galleryImages.length <= 5 }}
          thumbnails={{
            position: isMobile ? "bottom" : "end",
            width: isMobile ? 60 : 120,
            height: isMobile ? 40 : 80,
          }}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomInMultiplier: 2,
          }}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
            thumbnailsContainer: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
          }}
        />
      </Box>
    </Container>
  );
};

export default Gallery;
