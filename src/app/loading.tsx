"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Fade, Grow } from "@mui/material";
import loadinggif from "@/assests/loading/LOADINGGif.gif";
import Image from "next/image";

const LoadingPage = () => {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const loadingTexts = [
    "Loading your premium shopping experience...",
    "Preparing the finest collection...",
    "Curating exclusive deals...",
    "Almost ready for you...",
  ];

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(textTimer);
    };
  }, [loadingTexts.length]);

  return (
    <Box
      sx={{
        height: "100vh",
        background: `linear-gradient(135deg, 
          ${theme.palette.background.default} 0%, 
          ${theme.palette.mode === "dark" ? "#1a1a2e" : "#f8f9fa"} 100%)`,
        position: "relative",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        {/* Floating orbs with animation */}
        <Box
          sx={{
            width: { xs: 250, md: 400 },
            height: 400,
            background:
              "linear-gradient(45deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))",
            filter: "blur(80px)",
            borderRadius: "50%",
            position: "absolute",
            top: "15%",
            left: "10%",
            animation: "float 6s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
              "50%": { transform: "translateY(-20px) rotate(180deg)" },
            },
          }}
        />
        <Box
          sx={{
            width: { xs: 200, md: 350 },
            height: 350,
            background:
              "linear-gradient(45deg, rgba(236, 72, 153, 0.15), rgba(249, 115, 22, 0.15))",
            filter: "blur(80px)",
            borderRadius: "50%",
            position: "absolute",
            bottom: "15%",
            right: "15%",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
        <Box
          sx={{
            width: { xs: 150, md: 250 },
            height: 250,
            background:
              "linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))",
            filter: "blur(60px)",
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            right: "5%",
            animation: "float 10s ease-in-out infinite",
          }}
        />
      </Box>

      {/* Glass morphism container */}
      <Grow in={true} timeout={1000}>
        <Box
          sx={{
            zIndex: 50,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            padding: { xs: 4, md: 6 },
            background:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)"}`,
            borderRadius: "24px",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            minWidth: { xs: "300px", md: "400px" },
          }}
        >
          {/* Logo Section */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Fade in={true} timeout={1500}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    right: "-10px",
                    bottom: "-10px",
                    background:
                      "linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899, #f97316)",
                    borderRadius: "20px",
                    opacity: 0.3,
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { opacity: 0.3 },
                      "50%": { opacity: 0.6 },
                    },
                  },
                }}
              >
                <Image
                  src={loadinggif}
                  alt="ArvionMart Loading"
                  width={160}
                  height={80}
                  style={{
                    objectFit: "contain",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    position: "relative",
                    zIndex: 1,
                  }}
                  priority
                />
              </Box>
            </Fade>

            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #0d47a1, #5383ff, #4527a0)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
                mb: 1,
                letterSpacing: "0.5px",
                marginTop: 3,
              }}
            >
              ARVION MART
            </Typography>
          </Box>

          {/* Progress Bar */}
          <Box sx={{ width: "100%", mb: 2 }}>
            <Box
              sx={{
                width: "100%",
                height: "6px",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                borderRadius: "3px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #0d47a1, #5648d6, #ec4899, #4527a0)",
                  borderRadius: "3px",
                  transition: "width 0.3s ease",
                  width: `${Math.min(progress, 100)}%`,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                    animation: "shimmer 1.5s infinite",
                    "@keyframes shimmer": {
                      "0%": { transform: "translateX(-100%)" },
                      "100%": { transform: "translateX(100%)" },
                    },
                  },
                }}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                mt: 1,
                display: "block",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              {Math.round(Math.min(progress, 100))}%
            </Typography>
          </Box>

          {/* Loading Text with Fade Animation */}
          <Box
            sx={{
              textAlign: "center",
              minHeight: "48px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Fade in={true} timeout={500} key={textIndex}>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  textAlign: "center",
                }}
              >
                {loadingTexts[textIndex]}
              </Typography>
            </Fade>
          </Box>

          {/* Animated Dots */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "center",
            }}
          >
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
                  animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
                  "@keyframes bounce": {
                    "0%, 80%, 100%": { transform: "scale(0.8)", opacity: 0.5 },
                    "40%": { transform: "scale(1.2)", opacity: 1 },
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Grow>
    </Box>
  );
};

export default LoadingPage;
