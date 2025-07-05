'use client';

import React, { useState, useEffect } from 'react';
import { 
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
  useTheme,
  Tooltip,
  Fade,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from '@mui/icons-material';

// Currency conversion rate (1 USD to BDT) - Using integer math
// Multiplying by 110 instead of 110.5 to avoid floating point errors
const USD_TO_BDT_RATE = 110;

// Type definitions
interface CartItem {
  id: number;
  name: string;
  price: number;  // Price in USD (cents)
  quantity: number;
  image: string;
}

interface FloatingCartProps {
  initialItems?: CartItem[];
}

const FloatingCart: React.FC<FloatingCartProps> = ({ initialItems = [] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);
  const [showPriceAnimation, setShowPriceAnimation] = useState<boolean>(false);
  const [previousItemCount, setPreviousItemCount] = useState<number>(0);
  const theme = useTheme();

  // Convert USD cents to BDT (integer math)
  const convertToBDT = (usdCents: number): number => {
    return Math.round(usdCents * USD_TO_BDT_RATE / 100);
  };

  // Format BDT currency with thousand separators
  const formatBDT = (amount: number): string => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  // Calculate total price using integer math
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalPriceBDT = convertToBDT(totalPrice);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Format price for display in cart icon (handles large numbers)
  const formatIconPrice = (price: number): string => {
    if (price >= 10000) {
      return `${Math.floor(price / 1000)}k`;
    }
    return formatBDT(price);
  };

  // Update quantity with validation
  const updateQuantity = (id: number, change: number): void => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  // Remove item with confirmation
  const removeItem = (id: number): void => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  };

  // Toggle drawer with proper type handling
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open);
  };
  
  // Trigger price animation when cart items change
  useEffect(() => {
    if (itemCount > previousItemCount) {
      setShowPriceAnimation(true);
      const timer = setTimeout(() => {
        setShowPriceAnimation(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
    setPreviousItemCount(itemCount);
  }, [itemCount, previousItemCount]);

  return (
    <>
      {/* Floating Cart Button with Animation - Smaller Square Shape */}
      <Fade in={true}>
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            right: { xs: '10px', sm: '20px' },
            transform: 'translateY(-50%)',
            zIndex: 1000,
          }}
        >
          <Tooltip title="View Cart" arrow placement="left">
            <Badge 
              badgeContent={itemCount} 
              color="error"
              max={99}
              overlap="rectangular"
              sx={{
                '& .MuiBadge-badge': {
                  right: 3,
                  top: 3,
                  fontWeight: 'bold',
                  fontSize: '0.7rem',
                  minWidth: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `2px solid ${theme.palette.background.paper}`
                }
              }}
            >
              <Button
                onClick={toggleDrawer(true)}
                sx={{
                  borderRadius: '5px', // Square shape with slightly rounded corners
                  width: { xs: '50px', sm: '60px' },
                  height: { xs: '50px', sm: '60px' },
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease',
                  padding: 1,
                  minWidth: 'unset',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
                  }
                }}
                aria-label="Shopping Cart"
              >
                <ShoppingBag sx={{  fontSize: { xs: '1.3rem', sm: '1.5rem',  }  }} />
                
                {/* Price with counting animation */}
                <Box
                  sx={{
                    position: 'relative',
                    mt: 0.5,
                    height: '20px',
                 
                    width: '100%',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '0.6rem', sm: '0.65rem' },
                      textAlign: 'center',
                      lineHeight: 1,
                      position: 'absolute',
                      left: '50%',
                      transform: showPriceAnimation 
                        ? 'translateX(-50%) translateY(0%)' 
                        : 'translateX(-50%) translateY(0%)',
                      opacity: 1,
                      transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease',
                    }}
                  >
                    ৳ {formatIconPrice(totalPriceBDT)}
                  </Typography>
                  
                  {/* Animated overlay that slides up when price changes */}
                  {showPriceAnimation && (
                    <>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: { xs: '0.6rem', sm: '0.65rem' },
                          textAlign: 'center',
                          lineHeight: 1,
                          position: 'absolute',
                          left: '50%',
                          color: theme.palette.success.main,
                          transform: 'translateX(-50%) translateY(-100%)',
                          animation: 'slideUp 1s forwards',
                          '@keyframes slideUp': {
                            '0%': {
                              transform: 'translateX(-50%) translateY(100%)',
                              opacity: 0,
                            },
                            '20%': {
                              opacity: 1,
                            },
                            '80%': {
                              opacity: 1,
                            },
                            '100%': {
                              transform: 'translateX(-50%) translateY(-100%)',
                              opacity: 0,
                            }
                          }
                        }}
                      >
                        ৳ {formatIconPrice(totalPriceBDT)}
                      </Typography>
                      
                      {/* Count-up effect */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          textAlign: 'center',
                          animation: 'countPulse 0.6s ease-out',
                          '@keyframes countPulse': {
                            '0%': {
                              transform: 'scale(1)',
                            },
                            '50%': {
                              transform: 'scale(1.2)',
                            },
                            '100%': {
                              transform: 'scale(1)',
                            }
                          }
                        }}
                      >
                        <Typography
                          component="span"
                          sx={{
                            fontWeight: 'bold',
                            color: theme.palette.success.main,
                            fontSize: { xs: '0.65rem', sm: '0.7rem' },
                          }}
                        >
                          +
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Button>
            </Badge>
          </Tooltip>
        </Box>
      </Fade>

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: '450px' },
            padding: theme.spacing(2),
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ 
          position: 'relative', 
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Drawer Header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2,
            pb: 2,
            borderBottom: `1px solid ${theme.palette.divider}`
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalMallIcon color="primary" sx={{ mr: 1.5, fontSize: '1.8rem' }} />
              <Typography variant="h6" component="div" color="primary" sx={{ fontWeight: 700 }}>
                Your Cart ({itemCount} {itemCount === 1 ? 'Item' : 'Items'})
              </Typography>
            </Box>
            <Tooltip title="Close" arrow>
              <IconButton 
                onClick={toggleDrawer(false)} 
                size="medium"
                sx={{ 
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover
                  }
                }}
              >
                <CloseIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </Box>
          
          {/* Cart Items List */}
          {cartItems.length > 0 ? (
            <List sx={{ 
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              py: 1,
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.grey[400],
                borderRadius: '3px',
              }
            }}>
              {cartItems.map((item) => {
                const itemPriceBDT = convertToBDT(item.price);
                const itemTotalBDT = convertToBDT(item.price * item.quantity);
                
                return (
                  <ListItem
                    key={item.id}
                    alignItems="flex-start"
                    sx={{ 
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: theme.palette.background.paper,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Box sx={{ 
                        width: 80, 
                        height: 80, 
                        position: 'relative', 
                        borderRadius: 1, 
                        overflow: 'hidden',
                        border: `1px solid ${theme.palette.divider}`,
                      }}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="80px"
                        />
                      </Box>
                    </ListItemAvatar>
                    <Box sx={{ 
                      ml: 2,
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%'
                    }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ 
                          fontWeight: 600, 
                          mb: 0.5,
                          lineHeight: 1.3
                        }}>
                          {item.name}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <PriceCheckIcon fontSize="small" sx={{ 
                            color: theme.palette.success.main, 
                            mr: 0.5 
                          }} />
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            sx={{ fontWeight: 500 }}
                          >
                            ৳ {formatBDT(itemPriceBDT)} <span style={{ opacity: 0.7 }}>each</span>
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        pt: 1,
                        mt: 1,
                        borderTop: `1px solid ${theme.palette.divider}`
                      }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <IconButton 
                            size="small" 
                            onClick={() => updateQuantity(item.id, -1)}
                            sx={{ 
                              border: `1px solid ${theme.palette.grey[300]}`,
                              color: theme.palette.text.primary,
                              p: 0.5,
                              '&:hover': {
                                backgroundColor: theme.palette.grey[100],
                              },
                              '&:disabled': {
                                opacity: 0.5
                              }
                            }}
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ 
                                minWidth: '36px', 
                                textAlign: 'center',
                                fontWeight: 500 
                              }}>
                            {item.quantity}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => updateQuantity(item.id, 1)}
                            sx={{ 
                              border: `1px solid ${theme.palette.primary.main}`,
                              color: theme.palette.primary.main,
                              p: 0.5,
                              '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                              }
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                        
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 1
                        }}>
                          <Typography variant="body2" sx={{ 
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}>
                            ৳ {formatBDT(itemTotalBDT)}
                          </Typography>
                          <Tooltip title="Remove Item" arrow>
                            <IconButton 
                              edge="end" 
                              aria-label="delete" 
                              onClick={() => removeItem(item.id)}
                              size="small"
                              sx={{ 
                                color: theme.palette.error.main,
                                '&:hover': { 
                                  backgroundColor: theme.palette.error.light 
                                }
                              }}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Box sx={{ 
              flex: 1,
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              textAlign: 'center',
              p: 4
            }}>
              <ShoppingCartIcon sx={{ 
                fontSize: 80, 
                color: 'text.disabled', 
                mb: 2, 
                opacity: 0.3 
              }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                Your Cart is Empty
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '300px' }}>
                Looks like you haven&apos;t added any items to your cart yet.
              </Typography>
              <Button 
                variant="contained"
                color="primary"
                sx={{ 
                  mt: 3,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2
                }}
                onClick={toggleDrawer(false)}
                startIcon={<ShoppingCartIcon />}
              >
                Start Shopping
              </Button>
            </Box>
          )}

          {/* Cart Footer - Only show if there are items */}
          {cartItems.length > 0 && (
            <Box sx={{ 
              pt: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
            }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 2,
                px: 2,
                py: 1.5,
                backgroundColor: theme.palette.grey[50],
                borderRadius: 1
              }}>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }}>
                  Subtotal:
                </Typography>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 700,
                  color: theme.palette.primary.main
                }}>
                  ৳ {formatBDT(totalPriceBDT)}
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ 
                textAlign: 'center',
                color: theme.palette.text.secondary,
                mb: 2
              }}>
                Shipping and taxes calculated at checkout
              </Typography>
              
              <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                <Button 
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={toggleDrawer(false)}
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: 2
                  }}
                >
                  Continue Shopping
                </Button>
                <Link href="/checkout" passHref legacyBehavior>
                  <Button 
                    component="a"
                    variant="contained" 
                    color="primary"
                    fullWidth 
                    sx={{ 
                      py: 1.5,
                      fontWeight: 600,
                      borderRadius: 2,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        backgroundColor: theme.palette.primary.dark
                      }
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
              </Stack>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default FloatingCart;