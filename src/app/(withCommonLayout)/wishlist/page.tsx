/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/wishlist/page.tsx
"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Chip,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProductFromWishList,
  clearWishList,
  selectWishListWithDiscount,
} from "@/redux/features/wishList/wishListSlice";
import { Favorite, ShoppingCart, Visibility } from "@mui/icons-material";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useEffect, useState } from "react";
import Image from "next/image";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const wishListItems = useSelector(selectWishListWithDiscount);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClearWishlist = () => {
    dispatch(clearWishList());
  };

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeProductFromWishList(productId));
  };

  const handleAddToCart = (item: any) => {
    dispatch(
      addToCart({
        productId: item.productId,
        productSKU: item.sku,
        productName: item.productName,
        category: "",
        brand: item.brandName,
        discount: item.discount,
        purchasePrice: item.sellingPrice,
        sellingPrice: item.discount ? item.discountedPrice : item.sellingPrice,
        variant: item.sku,
        quantity: 1,
        image: item.image,
      })
    );
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleViewDetails = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    router.push(`/product/${productId}`);
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  const WishlistCard = ({ item }: { item: any }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const discount = item.discount || 0;
    const sellingPrice = item.sellingPrice;
    const discountedPrice = item.discountedPrice;

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
        {/* Top badges - Discount */}
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
        </Box>

        {/* Favorite button - Always filled since it's in wishlist */}
        <Tooltip title="Remove from wishlist">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFromWishlist(item.productId);
            }}
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
            <Favorite
              color="error"
              sx={{ fontSize: { xs: "16px", sm: "20px" } }}
            />
          </IconButton>
        </Tooltip>

        {/* Product image */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "180px", sm: "200px" },
            padding: { xs: "8px", sm: "12px" },
            cursor: "pointer",
            backgroundColor: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => handleProductClick(item.productId)}
        >
          {!imageLoaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                right: 8,
                bottom: 8,
                borderRadius: 2,
              }}
            />
          )}
          <Image
            src={item.image || "/placeholder-product.jpg"}
            alt={item.productName}
            onLoad={() => setImageLoaded(true)}
            fill
            style={{
              objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              borderRadius: "8px",
            }}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
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
              onClick={(e) => handleViewDetails(e, item.productId)}
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
          sx={{
            flexGrow: 1,
            p: { xs: 0.8, sm: 1.5 },
            pb: { xs: 0.8, sm: 1.5 },
          }}
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
            onClick={() => handleProductClick(item.productId)}
          >
            {item.productName}
          </Typography>

          {/* Brand name */}
          {item.brandName && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: { xs: 0.5, sm: 1 },
                fontSize: { xs: "11px", sm: "12px" },
                lineHeight: 1.2,
              }}
            >
              {item.brandName}
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
        </CardContent>

        {/* Add to cart button - Hidden on mobile */}
        <CardActions
          sx={{
            p: { xs: 0.8, sm: 1.5 },
            pt: 0,
            display: { xs: "none", sm: "block" },
          }}
        >
          <Button
            fullWidth
            variant="contained"
            startIcon={<ShoppingCart />}
            size="medium"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(item);
            }}
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
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4">
          My Wishlist ({wishListItems.length})
        </Typography>

        {wishListItems.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearWishlist}
            sx={{
              fontWeight: 600,
              borderRadius: 1,
              textTransform: "none",
            }}
          >
            Clear All
          </Button>
        )}
      </Box>

      {wishListItems.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" gutterBottom>
            Your wishlist is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Add items to your wishlist to see them here
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/products")}
          >
            Browse Products
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {wishListItems.map((item) => (
            <Grid size={{ xs: 6, sm: 3, md: 2.4, lg: 2 }} key={item.productId}>
              <WishlistCard item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WishlistPage;
