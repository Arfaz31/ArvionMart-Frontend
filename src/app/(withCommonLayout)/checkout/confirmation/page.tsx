// src/pages/checkout/confirmation.tsx
import { Container, Typography, Button, Paper, Divider, Grid } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function ConfirmationPage() {
  // In a real app, you would get the order ID from a context or query parameter
  const orderId = "ORD-12345-ABCDE";
  
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h4" gutterBottom>Order Confirmed!</Typography>
        <Typography variant="subtitle1" gutterBottom>
          Thank you for your purchase. Your order has been received.
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Order Number: {orderId}
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography paragraph>
          We&apos;ve sent a confirmation email with your order details and tracking information.
          You can also track your order in your account dashboard.
        </Typography>
        
        <Grid container spacing={2} justifyContent="center" mt={2}>
          <Grid>
            <Button variant="contained" color="primary" href="/account/orders">
              Track Order
            </Button>
          </Grid>
          <Grid >
            <Button variant="outlined" href="/">
              Continue Shopping
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}