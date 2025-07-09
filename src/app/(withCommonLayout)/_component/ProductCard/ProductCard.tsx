"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
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
import {
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  Visibility,
} from "@mui/icons-material";
import Image from "next/image";
import { addProductToWishList } from "@/redux/features/wishList/wishListSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";

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
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);

    // Dispatch to wishlist
    if (!isFavorite) {
      dispatch(
        addProductToWishList({
          productId: product._id,
          productName: product.productName,
          sku: primaryVariant._id,
          brandName: product.brand?.brandName || "",
          sellingPrice: primaryVariant.sellingPrice,
          discount: primaryVariant.discount,
          image: primaryImage,
        })
      );
    }
  };

  const handleProductClick = () => {
    router.push(`/product/${product._id}`);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/product/${product._id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Dispatch to cart
    dispatch(
      addToCart({
        productId: product._id,
        productSKU: primaryVariant._id,
        productName: product.productName,
        category: product.category?.categoryName || "",
        brand: product.brand?.brandName,
        discount: primaryVariant.discount,
        purchasePrice: primaryVariant.sellingPrice,
        sellingPrice: primaryVariant.sellingPrice,
        variant: primaryVariant._id,
        quantity: 1,
      })
    );
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
        borderRadius: { xs: 1, sm: 2 },
        overflow: "hidden",
        cursor: "pointer",
        "&:hover": {
          transform: { xs: "none", sm: "translateY(-5px)" },
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top badges - Discount and New */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: 4, sm: 8 },
          left: { xs: 4, sm: 8 },
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {discount > 0 && (
          <Chip
            label={`-${discount}%`}
            size="small"
            sx={{
              backgroundColor: "#1565c0",
              color: "white",
              fontWeight: 600,
              fontSize: { xs: "10px", sm: "12px" },
              height: { xs: "20px", sm: "24px" },
            }}
          />
        )}
        {product.isNewArrival && (
          <Chip
            label="New"
            size="small"
            sx={{
              backgroundColor: "#4dabf7",
              color: "white",
              fontWeight: 600,
              fontSize: { xs: "10px", sm: "12px" },
              height: { xs: "20px", sm: "24px" },
            }}
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
            top: { xs: 4, sm: 8 },
            right: { xs: 4, sm: 8 },
            zIndex: 2,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            width: { xs: "28px", sm: "32px" },
            height: { xs: "28px", sm: "32px" },
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          }}
        >
          {isFavorite ? (
            <Favorite
              color="error"
              sx={{ fontSize: { xs: "16px", sm: "20px" } }}
            />
          ) : (
            <FavoriteBorder
              sx={{ color: "#666", fontSize: { xs: "16px", sm: "20px" } }}
            />
          )}
        </IconButton>
      </Tooltip>

      {/* Product image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          padding: { xs: "3px", sm: "5px" },
          cursor: "pointer",
        }}
        onClick={handleProductClick}
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
              borderRadius: 1,
            }}
          />
        )}
        <Image
          src={primaryImage}
          alt={product.productName}
          onLoad={() => setImageLoaded(true)}
          fill
          style={{
            objectFit: "contain",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            borderRadius: "4px",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* View Details button - shows on hover and hidden on mobile */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 8, sm: 16 },
            left: "50%",
            transform: "translateX(-50%)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Button
            variant="contained"
            size="small"
            startIcon={<Visibility />}
            onClick={handleViewDetails}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              color: "#333",
              fontWeight: 600,
              borderRadius: 1,
              fontSize: "12px",
              padding: "4px 8px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 1)",
              },
            }}
          >
            View Details
          </Button>
        </Box>
      </Box>

      {/* Product content */}
      <CardContent
        sx={{ flexGrow: 1, p: { xs: 1, sm: 2 }, pb: { xs: 1, sm: 2 } }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={500}
          sx={{
            mb: { xs: 0.5, sm: 1 },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: { xs: "13px", sm: "16px" },
            lineHeight: { xs: 1.2, sm: 1.4 },
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={handleProductClick}
        >
          {product.productName}
        </Typography>

        {/* Brand name */}
        {product.brand && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: { xs: 0.5, sm: 1 },
              fontSize: { xs: "11px", sm: "12px" },
              lineHeight: 1.2,
            }}
          >
            {product.brand.brandName}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
            mb: { xs: 0.5, sm: 1 },
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            color="primary.main"
            sx={{
              fontSize: { xs: "14px", sm: "18px" },
              lineHeight: 1.2,
            }}
          >
            ৳{discountedPrice.toFixed(2)}
          </Typography>

          {discount > 0 && (
            <Typography
              variant="body2"
              color="text.disabled"
              sx={{
                textDecoration: "line-through",
                fontSize: { xs: "12px", sm: "14px" },
                lineHeight: 1.2,
              }}
            >
              ৳{sellingPrice.toFixed(2)}
            </Typography>
          )}
        </Box>

        {product.stock <= 0 && (
          <Chip
            label="Out of Stock"
            color="error"
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "10px", sm: "12px" },
              height: { xs: "20px", sm: "24px" },
            }}
          />
        )}
      </CardContent>

      {/* Add to cart button - Hidden on mobile */}
      <CardActions
        sx={{
          p: { xs: 1, sm: 2 },
          pt: 0,
          display: { xs: "none", sm: "block" },
        }}
      >
        <Button
          fullWidth
          variant="contained"
          startIcon={<ShoppingCart />}
          size="medium"
          disabled={product.stock < 1}
          onClick={handleAddToCart}
          sx={{
            fontWeight: 600,
            borderRadius: 1,
            justifyContent: "center",
            background: "linear-gradient(135deg, #1565c0 0%, #5648d6 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #0d47a1 0%, #4527a0 100%)",
              boxShadow: "0 4px 12px rgba(86, 72, 214, 0.3)",
            },
          }}
        >
          {product.stock < 1 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
