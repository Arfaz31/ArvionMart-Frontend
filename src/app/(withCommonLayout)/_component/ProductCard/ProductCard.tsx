"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Button,
  Chip,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { Favorite, FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import Image from "next/image";

interface IVariant {
  _id: string;
  sellingPrice: number;
  discount?: number;
  image?: string[];
  features?: string[];
}

// Provide default values for the variant
const DEFAULT_VARIANT: IVariant = {
  _id: "",
  sellingPrice: 0,
  discount: 0,
  image: [],
  features: [],
};

interface IProduct {
  _id: string;
  productName: string;
  description: string;
  brand?: {
    _id: string;
    brandName: string;
    brandLogo?: string;
  };
  category?: {
    _id: string;
    categoryName: string;
  };
  stock: number;
  isActive: boolean;
  isNewArrival?: boolean;
  variant?: IVariant[];
  createdAt?: string;
}

const ProductCard = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleProductClick = () => {
    router.push(`/product/${product._id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add to cart logic here
  };

  const primaryVariant: IVariant = product.variant?.[0] || DEFAULT_VARIANT;
  const primaryImage = primaryVariant.image?.[0] || "/placeholder-product.jpg";
  const sellingPrice = primaryVariant.sellingPrice;
  const discount = primaryVariant.discount || 0;
  const discountedPrice = sellingPrice - (sellingPrice * discount) / 100;

  return (
    <Card
      elevation={isHovered ? 6 : 2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "all 0.3s ease",
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
      onClick={handleProductClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <Box sx={{ position: "absolute", top: 8, left: 8, zIndex: 1 }}>
        {product.isNewArrival && (
          <Chip
            label="New"
            size="small"
            sx={{ fontWeight: 600, mr: 1, backgroundColor: "#fe9452" }}
          />
        )}
        {product.stock <= 0 && (
          <Chip
            label="Out of Stock"
            color="error"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        )}
        {discount > 0 && (
          <Chip
            label={`${discount}% OFF`}
            size="small"
            sx={{ fontWeight: 600, backgroundColor: "#fe9452", color: "white" }}
          />
        )}
      </Box>

      {/* Favorite button */}
      <Tooltip title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}>
        <IconButton
          size="small"
          onClick={handleFavoriteClick}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: "background.paper",
            "&:hover": {
              backgroundColor: "background.paper",
            },
          }}
        >
          {isFavorite ? (
            <Favorite color="error" fontSize="small" />
          ) : (
            <FavoriteBorder fontSize="small" />
          )}
        </IconButton>
      </Tooltip>

      {/* Product image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3", // Fixed aspect ratio
        }}
      >
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        )}
        <Image
          src={primaryImage}
          alt={product.productName}
          onLoad={() => setImageLoaded(true)}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Box>

      {/* Product content */}
      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
        <Typography
          variant="subtitle1"
          fontWeight={400}
          sx={{
            mb: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: { xs: "h6", sm: "18px" },
          }}
        >
          {product.productName}
        </Typography>

        {product.brand && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {product.brand.brandName}
          </Typography>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            color="primary.main"
            sx={{
              fontSize: { xs: "h6", sm: "h6" },
            }}
          >
            ${discountedPrice.toFixed(2)}
          </Typography>
          {discount > 0 && (
            <Typography
              variant="body2"
              color="text.disabled"
              sx={{ textDecoration: "line-through" }}
            >
              ${sellingPrice.toFixed(2)}
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* Add to cart button */}
      <CardActions
        sx={{
          p: 2,
          pt: 0,
          display: {
            lg: "block",
            md: "block",
            sm: "none",
            xs: "none",
          },
        }}
      >
        <Button
          fullWidth
          variant="contained"
          startIcon={<ShoppingCart />}
          size="small"
          disabled={product.stock <= 0}
          onClick={handleAddToCart}
          sx={{
            fontWeight: 600,
            borderRadius: 1,
          }}
        >
          {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
