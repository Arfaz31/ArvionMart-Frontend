// src/app/checkout/components/PaymentMethod.tsx
"use client";
import ReuseableSelectField from "@/Component/Forms/ReuseableSelect";
import { Box, Divider, Typography } from "@mui/material";

const paymentMethods = [
  { label: "Cash on Delivery", value: "CASH_ON_DELIVERY" },
  { label: "Credit Card", value: "CREDIT_CARD" },
  { label: "Mobile Banking", value: "MOBILE_BANKING" },
];

const PaymentMethod = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <ReuseableSelectField
        name="paymentMethod"
        label="Select Payment Method"
        items={paymentMethods}
        required
        fullWidth
      />
    </Box>
  );
};

export default PaymentMethod;
