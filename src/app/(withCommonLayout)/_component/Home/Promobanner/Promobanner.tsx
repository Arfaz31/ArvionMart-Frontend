"use client";

import { Box, Typography, Button, Container } from "@mui/material";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PromoBanner = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 250,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* Background image covering full banner */}
        <Image
          src="https://images.unsplash.com/photo-1588992370249-1b0fcaf6249b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Summer footwear collection"
          fill
          style={{
            objectFit: "contain",
          }}
          priority
        />

        {/* Gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, rgba(55, 65, 81, 0.85) 0%, rgba(233, 176, 132, 0.75) 100%)",
            zIndex: 1,
          }}
        />

        {/* Content container */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            px: 6,
            zIndex: 2,
          }}
        >
          {/* Left content */}
          <Box sx={{ maxWidth: "45%" }}>
            <Box
              sx={{
                bgcolor: "#EF4444",
                borderRadius: 50,
                py: 0.5,
                px: 2,
                display: "inline-block",
                mb: 1.5,
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Limited Time Offer
              </Typography>
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "white",
                mb: 1,
              }}
            >
              Summer Sale Collection
            </Typography>

            <Typography
              sx={{
                color: "white",
                mb: 2,
              }}
            >
              Get up to 50% off on all summer footwear
            </Typography>

            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "white",
                color: "#333",
                textTransform: "none",
                px: 3,
                py: 1,
                fontWeight: 500,
                "&:hover": {
                  bgcolor: "#f8f8f8",
                },
              }}
            >
              Shop Now
            </Button>
          </Box>

          {/* 50% badge */}
          <Box
            sx={{
              position: "absolute",
              right: 40,
              top: "50%",
              transform: "translateY(-50%)",
              width: 100,
              height: 100,
              borderRadius: "50%",
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              sx={{
                color: "#EF4444",
                fontWeight: 700,
                fontSize: "0.8rem",
                textTransform: "uppercase",
              }}
            >
              Up to
            </Typography>
            <Typography
              sx={{
                color: "#333",
                fontWeight: 900,
                fontSize: "2rem",
                lineHeight: 1,
              }}
            >
              50%
            </Typography>
            <Typography
              sx={{
                color: "#333",
                fontWeight: 700,
                fontSize: "0.8rem",
                textTransform: "uppercase",
              }}
            >
              Off
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PromoBanner;
