import { getCart } from '@/app/api/cartApi';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Breadcrumbs,
  Link as MuiLink,
  Paper,
  MenuItem
} from "@mui/material";
import CheckoutStepper from "../../_component/cartComponent/CheckoutStepper";
import CartSummary from "../../_component/cartComponent/CartSummary";
import { NavigateNext } from "@mui/icons-material";
import Link from "next/link";

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'UK', name: 'United Kingdom' },
];

export default async function DeliveryDetailsPage() {
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
          bgcolor: "primary.main",
          color: "white",
          py: 4,
          mb: 4,
          borderRadius: 3,
        }}
      >
        <Container maxWidth="xl">
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
            <MuiLink
              component={Link}
              href="/checkout/customer-details"
              color="inherit"
              underline="hover"
              sx={{ '&:hover': { color: 'white' } }}
            >
              Customer Details
            </MuiLink>
            <Typography color="white">Delivery Details</Typography>
          </Breadcrumbs>
        </Container>
      </Paper>

      {/* Checkout Stepper */}
      <Box sx={{ mb: 6 }}>
        <CheckoutStepper activeStep={1} />
      </Box>

      <Grid container spacing={4}>
        {/* Delivery Details Form */}
        <Grid size={{xs:12,md:8}}>
          <Paper elevation={0} sx={{ borderRadius: 3, }}>
           
            
            <Box component="form" noValidate>
              <Grid container spacing={3}>
              <Grid size={{xs:12}}>
                  <TextField
                    required
                    fullWidth
                    id="address1"
                    label="Address Line 1"
                    autoComplete="address-line1"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                  <TextField
                    fullWidth
                    id="address2"
                    label="Address Line 2 (Optional)"
                    autoComplete="address-line2"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                  <TextField
                    required
                    fullWidth
                    id="city"
                    label="City"
                    autoComplete="address-level2"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                  <TextField
                    required
                    fullWidth
                    id="state"
                    label="State/Province/Region"
                    autoComplete="address-level1"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                  <TextField
                    required
                    fullWidth
                    id="zip"
                    label="Zip / Postal code"
                    autoComplete="postal-code"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                  <TextField
                    required
                    fullWidth
                    id="country"
                    select
                    label="Country"
                    defaultValue="US"
                    autoComplete="country"
                    variant="outlined"
                    size="medium"
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{xs:12}}>
                  <Box display="flex" justifyContent="space-between">
                    <Button
                      component={Link}
                      href="/checkout/customer-details"
                      variant="outlined"
                      size="large"
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 2,
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      component={Link}
                      href="/checkout/payment"
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
                      Continue to Payment
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid size={{xs:12,md:4}}>
          <CartSummary cart={cart} />
        </Grid>
      </Grid>
    </Container>
  );
}