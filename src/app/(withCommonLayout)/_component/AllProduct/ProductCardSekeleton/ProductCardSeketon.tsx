import { Skeleton, Box } from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <Box
      sx={{
        width: 250,
        padding: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      {/* Category tag */}
      <Skeleton
        variant="text"
        width={50}
        height={20}
        sx={{ alignSelf: "flex-start" }}
      />

      {/* Image placeholder */}
      <Skeleton variant="rectangular" width={200} height={150} />

      {/* Product title */}
      <Skeleton variant="text" width="80%" height={25} />

      {/* Ratings */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Skeleton variant="text" width={50} height={20} />
        <Skeleton variant="text" width={70} height={20} />
      </Box>

      {/* Price */}
      <Skeleton variant="text" width="40%" height={30} />

      {/* Add to Cart button */}
      <Skeleton variant="rounded" width="80%" height={40} />
    </Box>
  );
};

export default ProductCardSkeleton;
