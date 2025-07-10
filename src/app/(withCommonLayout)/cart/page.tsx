// src/app/cart/page.tsx
"use client";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
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
  selectShippingPrice,
  setShippingPrice,
} from "@/redux/features/cart/cartSlice";
import { Delete, Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Link from "next/link";

const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const shippingPrice = useSelector(selectShippingPrice);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
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
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.productName}
                            sx={{ width: 80, height: 80, objectFit: "contain" }}
                          />
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
                              <Typography variant="body2">
                                Color: {item.color}
                              </Typography>
                            )}
                            {item.size && (
                              <Typography variant="body2">
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
                            sx={{ width: 60, textAlign: "center" }}
                          />
                          <IconButton
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.variant,
                                item.quantity + 1
                              )
                            }
                          >
                            <Add />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        ৳{(item.sellingPrice * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() =>
                            handleRemoveItem(item.productId, item.variant)
                          }
                          color="error"
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
              >
                Continue Shopping
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Subtotal:</Typography>
                  <Typography>
                    ৳
                    {cartItems
                      .reduce(
                        (sum, item) => sum + item.sellingPrice * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Shipping:</Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <TextField
                      size="small"
                      value={shippingPrice}
                      onChange={(e) =>
                        dispatch(setShippingPrice(Number(e.target.value) || 0))
                      }
                      sx={{ width: 100 }}
                    />
                    <Typography>৳</Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">৳{totalPrice.toFixed(2)}</Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CartPage;
