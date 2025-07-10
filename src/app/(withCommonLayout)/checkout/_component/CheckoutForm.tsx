// src/app/checkout/components/CheckoutForm.tsx
"use client";
import { Box, Divider, Typography } from "@mui/material";
import ReuseableInput from "@/Component/Forms/ReuseableInput";
import PaymentMethod from "./PaymentMethod";
import ShippingMethod from "./ShippingMethod";

const CheckoutForm = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Shipping Information
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <ReuseableInput
        name="customerName"
        label="Full Name"
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <ReuseableInput
        name="contactNumber"
        label="Phone Number"
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <ReuseableInput
        name="email"
        label="Email"
        type="email"
        fullWidth
        sx={{ mb: 2 }}
      />
      <ReuseableInput
        name="city"
        label="City"
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <ReuseableInput
        name="district"
        label="District"
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <ReuseableInput
        name="address"
        label="Full Address"
        fullWidth
        required
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />

      <ShippingMethod />
      <PaymentMethod />
    </Box>
  );
};

export default CheckoutForm;
