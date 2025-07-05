import { getCart } from "@/app/api/cartApi";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Breadcrumbs,
  Link as MuiLink,
  Paper
} from "@mui/material";
import CheckoutStepper from "../../_component/cartComponent/CheckoutStepper";

import { NavigateNext } from "@mui/icons-material";
import Link from "next/link";

export default async function CustomerDetailsPage() {
  const cart = await getCart();
  

  if (!cart || cart.items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3 }}>
            Please add items to your cart before proceeding to checkout.
          </Typography>
          <Button
            href="/products"
            variant="contained"
            size="large"
            sx={{
              px: 6,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Shop Now
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 6 } }}>
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          bgcolor:"primary.main",
          color: "white",
          py: 4,
          mb: 4,
          borderRadius: 3,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Checkout
          </Typography>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" sx={{ color: 'white' }} />}
            aria-label="breadcrumb"
            sx={{ color: "white" }}
          >
            <MuiLink
              component={Link}
              href="/"
              color="inherit"
              underline="hover"
              sx={{ '&:hover': { color: 'white' } }}
            >
              Home
            </MuiLink>
            <MuiLink
              component={Link}
              href="/products"
              color="inherit"
              underline="hover"
              sx={{ '&:hover': { color: 'white' } }}
            >
              Products
            </MuiLink>
            <MuiLink
              component={Link}
              href="/cart"
              color="inherit"
              underline="hover"
              sx={{ '&:hover': { color: 'white' } }}
            >
              Cart
            </MuiLink>
            <Typography color="white">Customer Details</Typography>
          </Breadcrumbs>
        </Container>
      </Paper>

      {/* Checkout Stepper */}
      <Box sx={{ mb: 6 }} >
        <CheckoutStepper activeStep={0} />
      </Box>

      <Grid container spacing={4}>
        {/* Customer Details Form */}
        <Grid size={{ xs: 12, md: 8, }}>
          <Paper elevation={0} sx={{  borderRadius: 3 }}>
          
            
            <Box component="form" noValidate >
              <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoComplete="given-name"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoComplete="family-name"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    autoComplete="tel"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                
                <Grid size={{ xs: 12 }}>
                 
                  <Box display="flex" justifyContent="space-between">
                    <Button
                      component={Link}
                      href="/cart"
                      variant="outlined"
                      size="large"
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 2,
                      }}
                    >
                      Back to Cart
                    </Button>
                    <Button
                      component={Link}
                      href="/checkout/delivery-details"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 2,
                      }}
                    >
                      Continue to Delivery
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

       
      </Grid>
    </Container>
  );
}