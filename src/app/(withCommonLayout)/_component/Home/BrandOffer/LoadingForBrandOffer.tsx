import { Box, Skeleton } from "@mui/material";

const LoadingForBrandOffer = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          lg: "repeat(4, 1fr)",
          md: "repeat(3, 1fr)",
          sm: "repeat(2, 1fr)",
          xs: "repeat(1, 1fr)",
        },
        gap: { lg: 3, md: 2.5, xs: 2 },
      }}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: "15px",
            overflow: "hidden",
            height: { lg: "280px", md: "250px", xs: "220px" },
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            sx={{
              borderRadius: "15px",
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default LoadingForBrandOffer;
