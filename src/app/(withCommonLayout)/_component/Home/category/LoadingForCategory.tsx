import { Box, Skeleton } from "@mui/material";

const LoadingForCategory = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          lg: "repeat(3, 1fr)",
          xs: "repeat(2, 1fr)",
          sm: "repeat(2, 1fr)",
        },
        alignItems: "center",
        gap: { lg: 5, xs: 2, sm: 2 },
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          sx={{
            width: "100%",
            height: { lg: "250px", xs: "100px", sm: "150px" },
            borderRadius: "10px",
          }}
        />
      ))}
    </Box>
  );
};

export default LoadingForCategory;
