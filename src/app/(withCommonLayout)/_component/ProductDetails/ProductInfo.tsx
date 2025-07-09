/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Chip,
  IconButton,
  Rating,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Share,
  ShoppingCart,
  LocalShipping,
  Verified,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import {
  addProductToWishList,
  removeProductFromWishList,
  selectIsInWishList,
} from "@/redux/features/wishList/wishListSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useGetReviewsByProductQuery } from "@/redux/api/reviewApi";

interface IProps {
  product: any;
}

export default function ProductInfo({ product }: IProps) {
  const dispatch = useDispatch();
  const isInWishlist = useSelector(selectIsInWishList(product._id));
  const [quantity] = useState(1);

  // Fetch reviews for the product
  const { data: reviewsData, isLoading: reviewsLoading } =
    useGetReviewsByProductQuery(
      { productId: product._id },
      { skip: !product._id }
    );

  const activeVariant = product.variant?.[0] || {};
  const discountPercentage = activeVariant.discount
    ? Math.round(activeVariant.discount)
    : 0;
  const discountedPrice = activeVariant.discount
    ? activeVariant.sellingPrice * (1 - activeVariant.discount / 100)
    : activeVariant.sellingPrice;

  // Calculate rating from reviews or use default
  const ratingData = useMemo(() => {
    if (reviewsLoading) {
      return { rating: 4, count: 1 };
    }

    if (reviewsData?.data && reviewsData.data.length > 0) {
      const reviews = reviewsData.data;
      const totalRating = reviews.reduce(
        (sum: number, review: any) => sum + review.rating,
        0
      );
      const avgRating = totalRating / reviews.length;
      return {
        rating: Math.round(avgRating * 10) / 10,
        count: reviews.length,
      };
    }

    return { rating: 4, count: 1 };
  }, [reviewsData, reviewsLoading]);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeProductFromWishList(product._id));
    } else {
      dispatch(
        addProductToWishList({
          productId: product._id,
          productName: product.productName,
          sku: product.sku,
          brandName: product.brand?.name || "",
          sellingPrice: activeVariant.sellingPrice,
          discount: activeVariant.discount,
          image: activeVariant.image?.[0] || "",
        })
      );
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        productSKU: product.sku,
        productName: product.productName,
        category: product.category?.name || "",
        brand: product.brand?.name || "",
        discount: activeVariant.discount,
        purchasePrice: activeVariant.purchasePrice,
        sellingPrice: activeVariant.sellingPrice,
        variant: activeVariant._id,
        size: activeVariant.size,
        color: activeVariant.color,
        quantity: quantity,
      })
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout page
  };

  return (
    <Box sx={{ pl: { xs: 0, md: 3 }, pr: { xs: 0, md: 2 } }}>
      {/* Product Name */}
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "text.primary",
          fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
        }}
      >
        {product.productName}
      </Typography>

      {/* Brand */}
      {product.brand?.name && (
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ mb: 2, fontWeight: 500 }}
        >
          by {product.brand.name}
        </Typography>
      )}

      {/* Rating */}
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Rating
          name="product-rating"
          value={ratingData.rating}
          precision={0.1}
          readOnly
          size="small"
        />
        <Typography variant="body2" color="text.secondary">
          {ratingData.rating} ({ratingData.count} review
          {ratingData.count !== 1 ? "s" : ""})
        </Typography>
      </Stack>

      {/* Price Section */}
      <Box mb={3}>
        {discountPercentage > 0 ? (
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              ₹{discountedPrice.toFixed(2)}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              ₹{activeVariant.sellingPrice.toFixed(2)}
            </Typography>
            <Chip
              label={`${discountPercentage}% OFF`}
              color="error"
              size="small"
              sx={{ fontWeight: "bold" }}
            />
          </Box>
        ) : (
          <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
            ₹{activeVariant.sellingPrice.toFixed(2)}
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Description */}
      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          Description
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.6 }}
        >
          {product.description?.substring(0, 250)}
          {product.description?.length > 250 && "..."}
        </Typography>
      </Box>

      {/* Stock */}
      <Box mb={3}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Verified color={product.stock > 0 ? "success" : "error"} />
          <Typography
            variant="body2"
            color={product.stock > 0 ? "success.main" : "error.main"}
            sx={{ fontWeight: 500 }}
          >
            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : "Out of Stock"}
          </Typography>
        </Stack>
      </Box>

      {/* SKU */}
      <Box mb={3}>
        <Typography variant="body2" color="text.secondary">
          SKU: {product.sku}
        </Typography>
      </Box>

      {/* Action Buttons: Responsive */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        mb={3}
        sx={{ width: "100%" }}
      >
        <Button
          variant="contained"
          size="large"
          fullWidth
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          sx={{
            py: 1.4,
            borderRadius: 2,
            textTransform: "none",
            fontSize: { xs: "0.95rem", sm: "1rem" },
            fontWeight: 600,
            background: "linear-gradient(135deg, #1565c0 0%, #5648d6 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #0d47a1 0%, #4527a0 100%)",
              boxShadow: "0 8px 24px rgba(86, 72, 214, 0.3)",
              transform: "translateY(-1px)",
            },
            transition: "all 0.2s ease",
          }}
        >
          Add to Cart
        </Button>
        <Button
          variant="outlined"
          size="large"
          fullWidth
          onClick={handleBuyNow}
          disabled={product.stock === 0}
          sx={{
            py: 1.4,
            borderRadius: 2,
            textTransform: "none",
            fontSize: { xs: "0.95rem", sm: "1rem" },
            fontWeight: 600,
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
              transform: "translateY(-1px)",
            },
            transition: "all 0.2s ease",
          }}
        >
          Buy Now
        </Button>
      </Stack>

      {/* Features */}
      <Box mb={3}>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Chip
            icon={<LocalShipping />}
            label="Fast Shipping"
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<Verified />}
            label="Authentic Product"
            variant="outlined"
            size="small"
          />
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Wishlist / Share Buttons */}
      <Stack direction="row" spacing={1}>
        <IconButton
          onClick={handleWishlistToggle}
          sx={{
            border: "1px solid",
            borderColor: isInWishlist ? "error.main" : "grey.300",
            borderRadius: 2,
            "&:hover": {
              borderColor: "error.main",
              backgroundColor: "error.50",
            },
          }}
        >
          {isInWishlist ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
        <IconButton
          sx={{
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: 2,
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "primary.50",
            },
          }}
        >
          <Share />
        </IconButton>
      </Stack>
    </Box>
  );
}
