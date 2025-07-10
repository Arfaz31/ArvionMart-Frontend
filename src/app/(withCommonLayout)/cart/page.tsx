// src/app/cart/page.tsx
"use client";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProduct,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectTotalPrice,
} from "@/redux/features/cart/cartSlice";
import { Delete, Add, Remove } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";

const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (
    productId: string,
    variant: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, variant, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId: string, variant: string) => {
    dispatch(removeProduct({ productId, variant }));
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
        <Typography variant="h4" gutterBottom>
          <Skeleton width="40%" />
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {["Product", "Price", "Quantity", "Total", "Action"].map(
                      (header) => (
                        <TableCell key={header}>
                          <Skeleton width="60%" />
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1, 2, 3].map((row) => (
                    <TableRow key={row}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Skeleton
                            variant="rectangular"
                            width={80}
                            height={80}
                          />
                          <Box width="100%">
                            <Skeleton width="80%" />
                            <Skeleton width="60%" />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton width="50%" />
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Skeleton variant="circular" width={40} height={40} />
                          <Skeleton width={60} height={40} sx={{ mx: 1 }} />
                          <Skeleton variant="circular" width={40} height={40} />
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton width="50%" />
                      </TableCell>
                      <TableCell align="right">
                        <Skeleton variant="circular" width={40} height={40} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <Skeleton width="40%" />
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Skeleton width="30%" />
                  <Skeleton width="20%" />
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Skeleton width="30%" />
                  <Skeleton width="20%" />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={3}>
                <Skeleton width="30%" height={30} />
                <Skeleton width="20%" height={30} />
              </Box>

              <Skeleton variant="rectangular" width="100%" height={40} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/products")}
            sx={{
              mt: 2,
              background: "linear-gradient(135deg, #1565c0 0%, #5648d6 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #0d47a1 0%, #4527a0 100%)",
              },
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={`${item.productId}-${item.variant}`}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Link href={`/product/${item.productId}`} passHref>
                            <Box
                              component="img"
                              src={item.image}
                              alt={item.productName}
                              sx={{
                                width: 80,
                                height: 80,
                                objectFit: "contain",
                                cursor: "pointer",
                                transition: "transform 0.3s ease",
                                "&:hover": {
                                  transform: "scale(1.05)",
                                },
                              }}
                            />
                          </Link>
                          <Box>
                            <Link
                              href={`/product/${item.productId}`}
                              passHref
                              style={{ textDecoration: "none" }}
                            >
                              <Typography
                                fontWeight={500}
                                sx={{
                                  color: "text.primary",
                                  "&:hover": {
                                    textDecoration: "underline",
                                    color: "primary.main",
                                  },
                                }}
                              >
                                {item.productName}
                              </Typography>
                            </Link>
                            {item.color && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Color: {item.color}
                              </Typography>
                            )}
                            {item.size && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Size: {item.size}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>৳{item.sellingPrice.toFixed(2)}</Typography>
                        {item.discount && item.discount > 0 && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textDecoration: "line-through" }}
                          >
                            ৳
                            {(
                              item.sellingPrice /
                              (1 - item.discount / 100)
                            ).toFixed(2)}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <IconButton
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.variant,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                            sx={{
                              color:
                                item.quantity <= 1
                                  ? "text.disabled"
                                  : "primary.main",
                              "&:hover": {
                                backgroundColor: "action.hover",
                              },
                            }}
                          >
                            <Remove />
                          </IconButton>
                          <TextField
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.productId,
                                item.variant,
                                parseInt(e.target.value) || 1
                              )
                            }
                            sx={{
                              width: 60,
                              textAlign: "center",
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "divider",
                                },
                                "&:hover fieldset": {
                                  borderColor: "primary.main",
                                },
                              },
                            }}
                            inputProps={{
                              style: { textAlign: "center" },
                              min: 1,
                            }}
                          />
                          <IconButton
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.variant,
                                item.quantity + 1
                              )
                            }
                            sx={{
                              color: "primary.main",
                              "&:hover": {
                                backgroundColor: "action.hover",
                              },
                            }}
                          >
                            <Add />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontWeight={600}>
                          ৳{(item.sellingPrice * item.quantity).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() =>
                            handleRemoveItem(item.productId, item.variant)
                          }
                          sx={{
                            color: "error.main",
                            "&:hover": {
                              backgroundColor: "error.light",
                              color: "white",
                            },
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                component={Link}
                href="/products"
                variant="outlined"
                color="primary"
                sx={{
                  px: 3,
                  "&:hover": {
                    borderWidth: 2,
                  },
                }}
              >
                Continue Shopping
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => dispatch(clearCart())}
                sx={{
                  px: 3,
                  "&:hover": {
                    borderWidth: 2,
                  },
                }}
              >
                Clear Cart
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Order Summary
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Subtotal:</Typography>
                  <Typography fontWeight={500}>
                    ৳
                    {cartItems
                      .reduce(
                        (sum, item) => sum + item.sellingPrice * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" fontWeight={700}>
                  ৳{totalPrice.toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                sx={{
                  height: 48,
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, #1565c0 0%, #5648d6 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #0d47a1 0%, #4527a0 100%)",
                    boxShadow: "0px 4px 12px rgba(86, 72, 214, 0.3)",
                  },
                  "&:disabled": {
                    background: "grey.300",
                  },
                }}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CartPage;
