"use client";
import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Button,
  Chip,
  Rating,
  Skeleton,
} from "@mui/material";

import { IProduct } from "@/types/types";
import {
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  Visibility,
} from "@mui/icons-material";
import Link from "next/link";

const ProductCard = ({ product }: { product: IProduct }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      sx={{
        height: "100%",
        width: "250px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "all 0.3s ease",
        borderRadius: 2,
        overflow: "hidden",

        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category badge */}
      <Chip
        label={product?.category?.categoryName}
        size="small"
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 2,
          bgcolor: "primary.main",
          color: "white",
          fontWeight: 500,
          fontSize: "0.75rem",
        }}
      />

      {/* Favorite button */}
      <IconButton
        size="small"
        onClick={handleFavoriteClick}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 2,

          "&:hover": {
            bgcolor: "background.paper",
            transform: "scale(1.1)",
          },
        }}
      >
        {isFavorite ? (
          <Favorite fontSize="small" color="error" />
        ) : (
          <FavoriteBorder fontSize="small" />
        )}
      </IconButton>

      {/* Product image */}
      <Box sx={{ position: "relative", pt: "75%", width: "100%" }}>
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        )}
        <CardMedia
          component="img"
          image={product.images[0]}
          alt={product.productName}
          onLoad={() => setImageLoaded(true)}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.08)" : "scale(1)",
          }}
        />

        {/* View Details button - appears on hover */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.3s ease",
            p: 2,
          }}
        >
          <Link href={`/products/${product._id}`}>
            <Button
              startIcon={<Visibility />}
              variant="contained"
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.9)",
                color: "text.primary",
                boxShadow: 2,
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "white",
                },
              }}
            >
              View Details
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Product content */}
      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Link
          href={`/products/${product._id}`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              height: "2.5rem",
              overflow: "hidden",
              color: "text.primary",
              textDecoration: "none",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            {product.productName}
          </Typography>
        </Link>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating
            value={product.totalReviews}
            precision={0.5}
            size="small"
            readOnly
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            ({product.totalReviews} reviews)
          </Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mt: "auto",
          }}
        >
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>

      {/* Action buttons */}
      <CardActions
        sx={{ pt: 0, pb: 2, px: 2, justifyContent: "space-between" }}
      >
        <Button
          variant="contained"
          startIcon={<AddShoppingCart />}
          size="small"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            boxShadow: 1,
            borderRadius: 1,
            height: "30px",
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
