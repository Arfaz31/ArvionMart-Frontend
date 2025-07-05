import React from "react";
import { Backdrop, CircularProgress, Box, Typography } from "@mui/material";

const GlassLoader = () => {
  return (
    <Backdrop
      open={true}
      sx={{
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          p: 4,
          borderRadius: 2,
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Option 1: Use Lottie animation */}
        {/* <Lottie 
          animationData={spinner} 
          loop={true} 
          style={{ height: 120, width: 120 }}
        /> */}

        <CircularProgress
          thickness={4}
          size={80}
          sx={{
            color: "white",
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))",
          }}
        />

        <Typography
          variant="body1"
          sx={{
            color: "white",
            textShadow: "0 0 8px rgba(255,255,255,0.5)",
            fontWeight: 500,
          }}
        >
          Loading...
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default GlassLoader;
