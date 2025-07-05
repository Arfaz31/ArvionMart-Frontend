// src/_component/CartItemList/page.tsx
'use client'
import {
    Box,
    Grid,
    IconButton,
    Typography,
    TextField,
    Avatar,
    Stack,
    useTheme,
    Divider
  } from '@mui/material';
  import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
  import Image from 'next/image';
  import { CartItem } from '@/types/cart';
  import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
  import { useState } from 'react';
  
  interface CartItemListProps {
    items: CartItem[];
  }
  
  export default function CartItemList({ items }: CartItemListProps) {
    const theme = useTheme();
    const [quantities, setQuantities] = useState<Record<string, number>>(
      items.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
    );
  
    const handleQuantityChange = (id: string, newValue: number) => {
      if (newValue >= 1 && newValue <= 10) {
        setQuantities(prev => ({ ...prev, [id]: newValue }));
        // TODO: Add API call to update quantity in backend
      }
    };
  
    return (
      <Box sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 3 }} >
        {items.map((item) => (
          <Box key={item.id}>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid size={{xs:3,sm:2}} >
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: '100%',
                      height: 0,
                      paddingBottom: '100%',
                      position: 'relative',
                      backgroundColor: 'background.paper'
                    }}
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      sizes="(max-width: 600px) 80px, 120px"
                    />
                  </Avatar>
                </Grid>
                <Grid size={{xs:9,sm:6}} >
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {item.product.description.substring(0, 60)}...
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 1.5 }}>
                    <IconButton size="small" color="error" sx={{ p: 0.5 }}>
                      <DeleteOutlineIcon fontSize="small" />
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        Remove
                      </Typography>
                    </IconButton>
                    <IconButton size="small" sx={{ p: 0.5 }}>
                      <FavoriteBorderOutlinedIcon fontSize="small" />
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        Save for later
                      </Typography>
                    </IconButton>
                  </Stack>
                </Grid>
                <Grid size={{xs:4,sm:2}} >
                  <TextField
                    type="number"
                    variant="outlined"
                    size="small"
                    value={quantities[item.id]}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    InputProps={{
                      inputProps: { min: 1, max: 10 },
                      sx: { borderRadius: 1, width: '80px' }
                    }}
                  />
                </Grid>
                <Grid size={{xs:4,sm:2}} textAlign="center">
                  <Typography variant="subtitle1" fontWeight={600}>
                    ${item.product.price.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid size={{xs:4,sm:2}} textAlign="right">
                  <Typography variant="subtitle1" fontWeight={600}>
                    ${(item.product.price * quantities[item.id]).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            {items.indexOf(item) < items.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    );
  }