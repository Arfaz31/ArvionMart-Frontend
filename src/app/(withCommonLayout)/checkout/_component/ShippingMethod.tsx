// src/app/checkout/components/ShippingMethod.tsx
"use client";
import {
  Box,
  Divider,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

const shippingOptions = [
  {
    id: "INSIDE_DHAKA",
    label: "Delivery Inside Dhaka",
    price: 66,
  },
  {
    id: "OUTSIDE_DHAKA",
    label: "Delivery Outside Dhaka",
    price: 99,
  },
];

const ShippingMethod = () => {
  const { register, watch, setValue } = useFormContext();
  const selectedMethod = watch("shippingMethod");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const method = event.target.value;
    setValue("shippingMethod", method);

    // Find the selected shipping option and set the price
    const selectedOption = shippingOptions.find(
      (option) => option.id === method
    );
    if (selectedOption) {
      setValue("shippingPrice", selectedOption.price);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Choose Shipping Method
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <RadioGroup value={selectedMethod} onChange={handleChange}>
        {shippingOptions.map((option) => (
          <Box
            key={option.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
              p: 2,
              border: "1px solid",
              borderColor:
                selectedMethod === option.id ? "primary.main" : "divider",
              borderRadius: 1,
              backgroundColor:
                selectedMethod === option.id
                  ? "action.selected"
                  : "background.paper",
            }}
          >
            <FormControlLabel
              value={option.id}
              control={<Radio />}
              label={option.label}
              sx={{ flexGrow: 1 }}
            />
            <Typography>৳{option.price.toFixed(2)}</Typography>
          </Box>
        ))}
      </RadioGroup>

      {/* Hidden input for shippingPrice */}
      <input type="hidden" {...register("shippingPrice")} />
    </Box>
  );
};

export default ShippingMethod;
