"use client";
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Image from "next/image";

const FashionDisplay = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
          gap: 2,
        }}
      >
        {/* Right Column - Men's Casual Section */}
        <Box
          sx={{
            position: "relative",
            height: { xs: 500, md: 700 },
            width: "100%",
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: "850px",
              width: "100%",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1637744360335-4df6d1d5ecf6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // This should be replaced with your actual image path
              alt="Men's casual footwear"
              width={500}
              height={800}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />

            {/* Text overlay */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                p: 4,
                background: "rgba(255,255,255,0.8)",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  color: "#333",
                }}
              >
                Cool CASUALS
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  MENS CASUAL
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    my: 2,
                    fontSize: "0.9rem",
                  }}
                >
                  Discover the premium men&apos;s casual footwear, ensuring
                  confidence & effortless elegance for every occasion.
                </Typography>

                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    mt: 1,
                    px: 3,
                    py: 0.5,
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  SHOP NOW
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Left Column - Traditional Formal Attire */}
        <Box
          sx={{
            position: "relative",
            height: "850px",
            width: "100%",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1613536143383-336e5de58f56?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // This should be replaced with your actual image path
            alt="Traditional formal attire"
            width={500}
            height={800}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </Box>
        <Box
          sx={{
            position: "relative",
            height: { xs: 500, md: 700 },
            width: "100%",
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: "850px",
              width: "100%",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1631954776681-cb6969c01373?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // This should be replaced with your actual image path
              alt="Men's casual footwear"
              width={500}
              height={800}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />

            {/* Text overlay */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                p: 4,
                background: "rgba(255,255,255,0.8)",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  color: "#333",
                }}
              >
                Cool CASUALS
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  MENS CASUAL
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    my: 2,
                    fontSize: "0.9rem",
                  }}
                >
                  Discover the premium men&apos;s casual footwear, ensuring
                  confidence & effortless elegance for every occasion.
                </Typography>

                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    mt: 1,
                    px: 3,
                    py: 0.5,
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  SHOP NOW
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FashionDisplay;
