// src/_component/ProductInfo/page.tsx
import { useState } from 'react';
import { Box, Typography, Rating, Button, Divider, FormControl, InputLabel, Select, MenuItem, TextField, Chip, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product } from '@/types/product';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );

  const handleAddToCart = () => {
    // Logic to add product to cart
    console.log('Adding to cart:', {
      product,
      quantity,
      variant: selectedVariant
    });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {product.name}
      </Typography>
      
      <Box display="flex" alignItems="center" mb={1}>
        <Rating value={product.rating} precision={0.5} readOnly />
        <Typography variant="body2" color="text.secondary" ml={1}>
          ({product.reviewCount} reviews)
        </Typography>
      </Box>
      
      <Typography variant="h5" color="primary" fontWeight="bold" my={2}>
        ${product.price.toFixed(2)}
      </Typography>
      
      {product.salePrice && (
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }} mr={1}>
            ${product.price.toFixed(2)}
          </Typography>
          <Chip label="Sale" color="error" size="small" />
        </Box>
      )}
      
      <Typography variant="body1" paragraph>
        {product.description}
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      {/* Product Variants (if any) */}
      {product.variants && product.variants.length > 0 && (
        <Box mb={3}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Variant</InputLabel>
            <Select
              value={selectedVariant}
              label="Variant"
              onChange={(e) => setSelectedVariant(e.target.value)}
            >
              {product.variants.map((variant, index) => (
                <MenuItem key={index} value={variant}>
                  {variant}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      
      {/* Quantity Selector */}
      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom>
          Quantity
        </Typography>
        <TextField
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          InputProps={{ inputProps: { min: 1 } }}
          size="small"
          sx={{ width: '80px' }}
        />
      </Box>
      
      {/* Availability Status */}
      <Typography 
        variant="body2" 
        color={product.inStock ? 'success.main' : 'error.main'} 
        mb={3}
      >
        {product.inStock ? 'In Stock' : 'Out of Stock'}
      </Typography>
      
      {/* Action Buttons */}
      <Stack direction="row" spacing={2} mb={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          fullWidth
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          Add to Cart
        </Button>
        <Button
          variant="outlined"
          startIcon={<FavoriteBorderIcon />}
          sx={{ minWidth: '48px', width: '48px' }}
        >
          <span className="sr-only">Add to Wishlist</span>
        </Button>
      </Stack>
      
      {/* Product Tags */}
      {product.tags && product.tags.length > 0 && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Tags:
          </Typography>
          <Stack direction="row" spacing={1}>
            {product.tags.map((tag, index) => (
              <Chip key={index} label={tag} size="small" />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}