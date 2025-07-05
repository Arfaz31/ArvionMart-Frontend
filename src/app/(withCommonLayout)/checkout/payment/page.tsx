import { getCart } from '@/app/api/cartApi';
import {
  Container,
  Typography,
  Box,
 
  Button,
  Grid,
  Breadcrumbs,
  Link as MuiLink,
  Paper,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  Alert,
} from "@mui/material";
import CheckoutStepper from "../../_component/cartComponent/CheckoutStepper";
import CartSummary from "../../_component/cartComponent/CartSummary";
import { NavigateNext, Lock, Payment } from "@mui/icons-material";
import Link from "next/link";


export default async function PlaceOrderPage() {
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
            Place Order
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
            <MuiLink
              component={Link}
              href="/checkout/delivery-details"
              color="inherit"
              underline="hover"
              sx={{ '&:hover': { color: 'white' } }}
            >
              Delivery Details
            </MuiLink>
            <Typography color="white">Payment & Place Order</Typography>
          </Breadcrumbs>
        </Container>
      </Paper>

      {/* Checkout Stepper */}
      <Box sx={{ mb: 6 }}>
        <CheckoutStepper activeStep={2} />
      </Box>

      <Grid container spacing={4}>
      <Grid size={{xs:12,md:4}}>
          <CartSummary cart={cart} />
          
          <Paper elevation={0} sx={{ borderRadius: 3, p: 3, mt: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Order Confirmation
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              By clicking &ldquo;Place Order&quot;, you agree to our terms and conditions. Your order will be processed immediately using your selected payment method.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Lock fontSize="small" color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Secure transaction
              </Typography>
            </Box>
          </Paper>
        </Grid>
        {/* Payment Form */}
        <Grid size={{xs:12,md:8}}>
          <Paper elevation={0} sx={{ borderRadius: 3, p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Payment color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Payment Method
              </Typography>
            </Box>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              Choose your preferred payment method. All transactions are secure and encrypted.
            </Alert>
            
            <Box component="form" noValidate>
              <RadioGroup defaultValue="bkash" sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                  Mobile Banking
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{xs:6,md:2}}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        '&:hover': { borderColor: 'primary.main' },
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative'
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          mb: 1, 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Box component="img" src="/images/bkash-logo.png" alt="bKash" sx={{ width: '100%', height: 'auto' }} />
                      </Box>
                      <FormControlLabel 
                        value="bkash" 
                        control={<Radio />} 
                        label="bKash" 
                        sx={{ m: 0 }}
                      />
                    </Paper>
                  </Grid>
                  
                  <Grid size={{xs:6,md:2}}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        '&:hover': { borderColor: 'primary.main' },
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          mb: 1, 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Box component="img" src="/images/nagad-logo.png" alt="Nagad" sx={{ width: '100%', height: 'auto' }} />
                      </Box>
                      <FormControlLabel 
                        value="nagad" 
                        control={<Radio />} 
                        label="Nagad" 
                        sx={{ m: 0 }}
                      />
                    </Paper>
                  </Grid>
                  
                  <Grid size={{xs:6,md:2}}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        '&:hover': { borderColor: 'primary.main' },
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          mb: 1, 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Box component="img" src="/images/rocket-logo.png" alt="Rocket" sx={{ width: '100%', height: 'auto' }} />
                      </Box>
                      <FormControlLabel 
                        value="rocket" 
                        control={<Radio />} 
                        label="Rocket" 
                        sx={{ m: 0 }}
                      />
                    </Paper>
                  </Grid>
                  
                  <Grid size={{xs:6,md:2}}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        '&:hover': { borderColor: 'primary.main' },
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          mb: 1, 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Box component="img" src="/images/upay-logo.png" alt="Upay" sx={{ width: '100%', height: 'auto' }} />
                      </Box>
                      <FormControlLabel 
                        value="upay" 
                        control={<Radio />} 
                        label="Upay" 
                        sx={{ m: 0 }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                  Banking & Cards
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{xs:6,md:3}}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        '&:hover': { borderColor: 'primary.main' },
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          mb: 1, 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Box component="img" src="/images/sslcommerz-logo.png" alt="SSLCommerz" sx={{ width: '100%', height: 'auto' }} />
                      </Box>
                      <FormControlLabel 
                        value="sslcommerz" 
                        control={<Radio />} 
                        label="Card/Bank" 
                        sx={{ m: 0 }}
                      />
                    </Paper>
                  </Grid>
                  
                  <Grid size={{xs:6,md:3}}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        '&:hover': { borderColor: 'primary.main' },
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          mb: 1, 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Box component="img" src="/images/nexus-pay-logo.png" alt="Nexus Pay" sx={{ width: '100%', height: 'auto' }} />
                      </Box>
                      <FormControlLabel 
                        value="nexus_pay" 
                        control={<Radio />} 
                        label="Nexus Pay" 
                        sx={{ m: 0 }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 3 }} />
                
                <FormControlLabel 
                  value="cod" 
                  control={<Radio />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>Cash on Delivery</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>(Pay when you receive)</Typography>
                    </Box>
                  }
                  sx={{ mb: 1 }}
                />
              </RadioGroup>
              
             
              
              <Box display="flex" justifyContent="space-between" sx={{ mt: 4 }}>
                <Button
                  component={Link}
                  href="/checkout/delivery-details"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 4,
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 6,
                  }}
                >
                  Place Order
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Order Summary */}
        
      </Grid>
    </Container>
  );
}