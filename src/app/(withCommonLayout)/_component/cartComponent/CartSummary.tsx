// src/_component/CartSummary/page.tsx
'use client'
import {
    Box,
    CardContent,
    Typography,
    Divider,
    TextField,
    Button,
    Paper,
    useTheme
  } from '@mui/material';
  import { Cart } from '@/types/cart';
  import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
  import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
  
  interface CartSummaryProps {
    cart: Cart;
  }
  
  export default function CartSummary({ cart }: CartSummaryProps) {
    const theme = useTheme();
    const subtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.07;
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + tax + shipping;
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  
    return (
      <Paper elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Order Summary
          </Typography>
  
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </Typography>
              <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Shipping
              </Typography>
              <Typography variant="body2">
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Tax
              </Typography>
              <Typography variant="body2">${tax.toFixed(2)}</Typography>
            </Box>
          </Box>
  
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Discount code"
              size="small"
              InputProps={{
                startAdornment: (
                  <DiscountOutlinedIcon
                    fontSize="small"
                    sx={{ color: 'text.secondary', mr: 1 }}
                  />
                ),
                sx: { borderRadius: 1, backgroundColor: 'background.paper' }
              }}
              sx={{ mr: 1 }}
            />
            <Button
              variant="outlined"
              size="small"
              sx={{
                textTransform: 'none',
                borderRadius: 1,
                px: 2,
                py: 1,
                whiteSpace: 'nowrap'
              }}
            >
              Apply
            </Button>
          </Box>
  
          <Divider sx={{ my: 2 }} />
  
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={700}>
              Total
            </Typography>
            <Typography variant="subtitle1" fontWeight={700}>
              ${total.toFixed(2)}
            </Typography>
          </Box>
  
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'skyblue',
              p: 1.5,
              borderRadius: 1
            }}
          >
            <LocalShippingOutlinedIcon
              fontSize="small"
              sx={{ color: 'black', mr: 1 }}
            />
            <Typography variant="body2" color="black">
              {shipping === 0
                ? 'You qualify for free shipping!'
                : `Add $${(100 - subtotal).toFixed(2)} more to get free shipping`}
            </Typography>
          </Box>
        </CardContent>
      </Paper>
    );
  }