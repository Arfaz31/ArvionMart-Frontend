/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/checkout/components/OrderSummary.tsx
"use client";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import { useFormContext } from "react-hook-form";

interface OrderSummaryProps {
  cartItems: any[];
  totalPrice: number;
  isLoading: boolean;
}

const OrderSummary = ({
  cartItems,
  totalPrice,
  isLoading,
}: OrderSummaryProps) => {
  const { watch } = useFormContext();
  const shippingPrice = watch("shippingPrice") || 0;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <Divider sx={{ my: 2 }} />

      <List>
        {cartItems.map((item) => (
          <ListItem key={`${item.productId}-${item.variant}`} sx={{ py: 1 }}>
            <ListItemText
              primary={item.productName}
              secondary={`Qty: ${item.quantity}`}
            />
            <Typography variant="body2">
              ৳{(item.sellingPrice * item.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography>Subtotal:</Typography>
        <Typography>
          ৳
          {cartItems
            .reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0)
            .toFixed(2)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography>Shipping:</Typography>
        <Typography>৳{shippingPrice.toFixed(2)}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h6">
          ৳{(Number(totalPrice) + Number(shippingPrice)).toFixed(2)}
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Place Order"}
      </Button>
    </Paper>
  );
};

export default OrderSummary;
