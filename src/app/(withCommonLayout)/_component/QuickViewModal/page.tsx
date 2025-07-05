'use client'
import { useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Stack,
  Divider,
  Button,
  Grid,
  Rating,
  Chip,
  TextField
} from '@mui/material';
import {
  Close,
  FavoriteBorder,
  Favorite,
  ShoppingCart,
  ZoomIn,
  Remove,
  Add
} from '@mui/icons-material';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description?: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
};

const QuickViewModal = ({
  product,
  open,
  onClose
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log({
      productId: product.id,
      quantity,
      size: selectedSize,
      color: selectedColor
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '90%', md: '80%', lg: '70%' },
          maxWidth: '1200px',
          maxHeight: { xs: '95vh', sm: '90vh' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          overflowY: 'auto',
          p: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: { xs: 8, sm: 16 },
            top: { xs: 8, sm: 16 },
            color: 'text.secondary',
            zIndex: 1
          }}
        >
          <Close />
        </IconButton>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {/* Product Images */}
          <Grid size={{xs: 12, md: 6}}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                height: { xs: 'auto', md: '100%' },
                minHeight: { xs: '250px', sm: '300px', md: 'auto' }
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: { xs: 'auto', md: '100%' },
                  objectFit: 'cover',
                  borderRadius: 2
                }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  bgcolor: 'rgba(255,255,255,0.8)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                }}
              >
                <ZoomIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid size={{xs: 12, md: 6}}>
            <Stack spacing={{ xs: 1.5, sm: 2 }}>
              <Typography 
                variant="h4" 
                component="h2" 
                fontWeight="bold"
                sx={{ 
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                }}
              >
                {product.name}
              </Typography>

              <Box display="flex" alignItems="center" gap={1}>
                <Rating
                  value={product.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" color="text.secondary">
                  ({product.reviews} reviews)
                </Typography>
              </Box>

              <Typography 
                variant="h5" 
                fontWeight="bold" 
                color="primary"
                sx={{ 
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
              >
                ${product.price.toFixed(2)}
              </Typography>

              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  mb: { xs: 1, sm: 2 },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                {product.description ||
                  'Premium quality product with excellent comfort and durability. Designed for performance and style.'}
              </Typography>

              <Divider />

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    Size
                  </Typography>
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {product.sizes.map((size) => (
                      <Chip
                        key={size}
                        label={size}
                        variant={selectedSize === size ? 'filled' : 'outlined'}
                        color={selectedSize === size ? 'primary' : 'default'}
                        onClick={() => setSelectedSize(size)}
                        sx={{
                          minWidth: 50,
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          mb: 0.5
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    Color
                  </Typography>
                  <Stack direction="row" gap={2} flexWrap="wrap">
                    {product.colors.map((color) => (
                      <Box
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        sx={{
                          width: { xs: 32, sm: 40 },
                          height: { xs: 32, sm: 40 },
                          borderRadius: '50%',
                          bgcolor: color.hex,
                          border:
                            selectedColor === color.name
                              ? '3px solid #00a39b'
                              : '2px solid #e0e0e0',
                          cursor: 'pointer',
                          position: 'relative',
                          mb: 1,
                          '&::after':
                            selectedColor === color.name
                              ? {
                                  content: '""',
                                  position: 'absolute',
                                  top: -5,
                                  right: -5,
                                  width: 20,
                                  height: 20,
                                  bgcolor: '#00a39b',
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  fontSize: '0.75rem'
                                }
                              : {}
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Quantity Selector */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Quantity
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    display="flex"
                    alignItems="center"
                    border="1px solid"
                    borderColor="divider"
                    borderRadius={1}
                  >
                    <IconButton
                      onClick={() => handleQuantityChange('decrease')}
                      size="small"
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <TextField
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value > 0) {
                          setQuantity(value);
                        }
                      }}
                      inputProps={{
                        style: {
                          textAlign: 'center',
                          width: '40px',
                          padding: '8px'
                        }
                      }}
                      variant="standard"
                      sx={{ '& .MuiInput-underline:before': { border: 'none' } }}
                    />
                    <IconButton
                      onClick={() => handleQuantityChange('increase')}
                      size="small"
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {quantity > 1 ? `${quantity} items` : '1 item'}
                  </Typography>
                </Box>
              </Box>

              <Divider />

              {/* Action Buttons */}
              <Box 
                display="flex" 
                gap={{ xs: 1, sm: 2 }} 
                flexDirection={{ xs: 'column', sm: 'row' }}
                mt={{ xs: 1, sm: 2 }}
              >
                <Button
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  sx={{
                    flexGrow: 1,
                    py: { xs: 1, sm: 1.5 },
                    bgcolor: '#00a39b',
                    '&:hover': { bgcolor: '#008a82' }
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  startIcon={isWishlisted ? <Favorite /> : <FavoriteBorder />}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  sx={{
                    flexGrow: 1,
                    py: { xs: 1, sm: 1.5 },
                    color: isWishlisted ? 'error.main' : 'inherit',
                    borderColor: isWishlisted ? 'error.main' : 'inherit'
                  }}
                >
                  {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                </Button>
              </Box>

              {/* Product Meta */}
              <Box mt={1}>
                <Typography variant="caption" color="text.secondary">
                  Category: {product.category}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default QuickViewModal;