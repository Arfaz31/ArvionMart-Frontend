"use client";

import React from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";

const LoadingPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        position: "relative",
        inset: 0,
        zIndex: 9999,
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Blurred Background Elements */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: { xs: 200, md: 300 },
            height: 300,
            backgroundColor: "rgba(33, 150, 243, 0.2)",
            filter: "blur(100px)",
            position: "absolute",
            top: "28%",
            left: "20%",
          }}
        />
        <Box
          sx={{
            width: { xs: 200, md: 300 },
            height: 300,
            backgroundColor: "rgba(255, 193, 7, 0.2)",
            filter: "blur(100px)",
            position: "absolute",
            bottom: "10%",
            right: "20%",
          }}
        />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          zIndex: 50,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* Spinner with PrimeShoes branding */}
        <CircularProgress
          size={80}
          thickness={4}
          sx={{
            color: theme.palette.primary.main,
            animationDuration: "800ms",
          }}
        />

        {/* Text that matches PrimeShoes branding */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 500,
              color: theme.palette.text.primary,
              mb: 1,
            }}
          >
            PrimeShoes
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            Loading your premium shopping experience...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingPage;
