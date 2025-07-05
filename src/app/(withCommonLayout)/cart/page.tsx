import { getCart } from "@/app/api/cartApi";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  Badge,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import CartItemList from "../_component/cartComponent/CartItemList";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import { NavigateNext } from "@mui/icons-material";

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          elevation={0}
          sx={{ p: 4, textAlign: "center", borderRadius: 3 }}
        >
          <Badge
            badgeContent={0}
            color="primary"
            overlap="circular"
            sx={{
              mb: 3,
              "& .MuiBadge-badge": {
                width: 60,
                height: 60,
                borderRadius: "50%",
              },
            }}
          >
            <ShoppingBagOutlinedIcon
              sx={{ fontSize: 80, color: "text.disabled" }}
            />
          </Badge>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Your Cart is Empty
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: 500, mx: "auto", mb: 3 }}
          >
            Looks like you haven&apos;t added any products to your cart yet.
            Start shopping to fill it with amazing products!
          </Typography>
          <Button
            component={Link}
            href="/products"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Header Banner */}
      <Box sx={{ bgcolor: "#00a39b", color: "white", py: 4, mb: 4,   borderRadius: 3, }}>
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Cart
          </Typography>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ color: "white" }}
          >
            <MuiLink
              component={Link}
              href="/"
              color="inherit"
              underline="hover"
            >
              Home
            </MuiLink>
            <MuiLink
              component={Link}
              href="/all-products"
              color="inherit"
              underline="hover"
            >
              Products
            </MuiLink>
            <MuiLink
              component={Link}
              href="/cart"
              color="inherit"
              underline="hover"
            >
              Cart
            </MuiLink>
          
          </Breadcrumbs>
        </Container>
      </Box>

      <Grid container spacing={4}  >
        {/* Cart Items */}
        <Grid size={{ xs: 12, md: 8 }} >
          <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden" }} >
            <CartItemList items={cart.items} />
          </Paper>
          <Button
            fullWidth
            component={Link}
            href="/checkout/customer-details"
            variant="contained"
            color="primary"
            size="large"
            disabled={cart.items.length === 0}
            sx={{
              mt: 3,
              py: 2,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
              "&:disabled": { backgroundColor: "action.disabledBackground" },
            }}
          >
            Proceed to Checkout
          </Button>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, textAlign: "center" }}
          >
            or{" "}
            <Link
              href="/products"
              style={{ color: "inherit", fontWeight: 500 }}
            >
              Continue Shopping
            </Link>
          </Typography>
        </Grid>

        
        
      </Grid>
    </Container>
  );
}
