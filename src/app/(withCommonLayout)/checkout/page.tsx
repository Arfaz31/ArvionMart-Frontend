/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/checkout/page.tsx
"use client";
import { Container, Grid, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectTotalPrice,
} from "@/redux/features/cart/cartSlice";

import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import ReuseableForm from "@/Component/Forms/ReuseableForm";
import CheckoutForm from "./_component/CheckoutForm";
import OrderSummary from "./_component/OrderSummary";

const CheckoutPage = () => {
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const defaultValues = {
    customerName: "",
    contactNumber: "",
    email: "",
    city: "",
    district: "",
    address: "",
    shippingMethod: "INSIDE_DHAKA", // Default shipping method
    shippingPrice: 66, // Default price for Inside Dhaka
  };

  const handleSubmit = async (values: any) => {
    try {
      const orderData = {
        customerInfo: {
          customerName: values.customerName,
          contactNumber: values.contactNumber,
          email: values.email,
          city: values.city,
          district: values.district,
          address: values.address,
        },
        orderItems: cartItems,
        paymentMethod: values.paymentMethod,
        shippingMethod: values.shippingMethod,
        shippingPrice: values.shippingPrice,
        totalPrice: totalPrice,
      };

      const res = await createOrder(orderData).unwrap();
      if (res?.statusCode === 201) {
        toast.success("Order placed successfully!");
        router.push(`/order-confirmation/${res.data._id}`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to place order");
    }
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.push("/products")}
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Checkout
      </Typography>

      <ReuseableForm onSubmit={handleSubmit} defaultValues={defaultValues}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <CheckoutForm />
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <OrderSummary
              cartItems={cartItems}
              totalPrice={totalPrice}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </ReuseableForm>
    </Container>
  );
};

export default CheckoutPage;
