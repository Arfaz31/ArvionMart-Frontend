// // src/components/product/ProductInfo.tsx
// 'use client';

// import { useState } from 'react';
// import { Products } from '@/types/types';
// import {
//   Typography,
//   Chip,
//   Rating,
//   Box,
//   Divider,
//   Button,
//   IconButton,
//   Stack,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   SelectChangeEvent,
//   Alert,
//   Snackbar,
//   Grid,
//   Tooltip,
//   Link
// } from '@mui/material';
// import {
//   AddShoppingCart,
//   FavoriteBorder,
//   Favorite,
//   LocalShipping,
//   VerifiedUser,
//   Loop,
//   StraightenOutlined,
//   HelpOutline
// } from '@mui/icons-material';

// interface ProductInfoProps {
//   product: Products;
// }

// export default function ProductInfo({ product }: ProductInfoProps) {
//   const [quantity, setQuantity] = useState(1);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [showCartNotification, setShowCartNotification] = useState(false);

//   // Shoe-specific state
//   const [size, setSize] = useState('');
//   const [color, setColor] = useState('');
//   const [width, setWidth] = useState('medium');

//   const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(event.target.value);
//     if (value > 0) {
//       setQuantity(value);
//     }
//   };

//   const handleSizeChange = (event: SelectChangeEvent) => {
//     setSize(event.target.value);
//   };

//   const handleColorChange = (event: SelectChangeEvent) => {
//     setColor(event.target.value);
//   };

//   const handleWidthChange = (event: SelectChangeEvent) => {
//     setWidth(event.target.value);
//   };

//   const handleAddToCart = () => {
//     // In a real app, this would dispatch an action to add the product to cart
//     console.log(`Added ${quantity} of ${product.name} in size ${size}, color ${color}, width ${width} to cart`);
//     setShowCartNotification(true);
//   };

//   const toggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//   };

//   // Shoe-specific data
//   const shoeColors = [
//     { value: 'black', label: 'Black' },
//     { value: 'white', label: 'White' },
//     { value: 'navy', label: 'Navy Blue' },
//     { value: 'red', label: 'Red' },
//     { value: 'brown', label: 'Brown' },
//   ];

//   const shoeSizes = [
//     { value: '6', label: 'US 6 / EU 39' },
//     { value: '7', label: 'US 7 / EU 40' },
//     { value: '8', label: 'US 8 / EU 41' },
//     { value: '9', label: 'US 9 / EU 42' },
//     { value: '10', label: 'US 10 / EU 43' },
//     { value: '11', label: 'US 11 / EU 44' },
//     { value: '12', label: 'US 12 / EU 45' },
//   ];

//   const shoeWidths = [
//     { value: 'narrow', label: 'Narrow (B)' },
//     { value: 'medium', label: 'Medium (D)' },
//     { value: 'wide', label: 'Wide (E)' },
//     { value: 'extra-wide', label: 'Extra Wide (EE)' },
//   ];

//   return (
//     <Stack spacing={3}>
//       <Box display="flex" gap={1} flexWrap="wrap">
//         <Chip
//           label={product.category}
//           color="primary"
//           size="small"
//         />
//         {/* Shoe-specific tags */}
//         <Chip
//           label="Running"
//           variant="outlined"
//           size="small"
//         />
//         <Chip
//           label="Athletic"
//           variant="outlined"
//           size="small"
//         />
//       </Box>

//       <Typography variant="h4" component="h1" fontWeight={700}>
//         {product.name}
//       </Typography>

//       <Box display="flex" alignItems="center" gap={1}>
//         <Rating value={product.rating} precision={0.5} readOnly />
//         <Typography variant="body2" color="text.secondary">
//           ({product.reviews} reviews)
//         </Typography>
//       </Box>

//       <Typography variant="h4" color="primary" fontWeight={700}>
//         ${product.price.toFixed(2)}
//       </Typography>

//       <Divider />

//       <Typography variant="body1">
//         {product.description}
//       </Typography>

//       {/* Shoe-specific details */}
//       <Grid container spacing={2}>
//       <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" fontWeight={600}>Material</Typography>
//           <Typography variant="body2">Leather upper, rubber sole</Typography>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" fontWeight={600}>Cushioning</Typography>
//           <Typography variant="body2">Medium</Typography>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" fontWeight={600}>Weight</Typography>
//           <Typography variant="body2">10.5 oz (297g)</Typography>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" fontWeight={600}>Heel-to-Toe Drop</Typography>
//           <Typography variant="body2">10mm</Typography>
//         </Grid>
//       </Grid>

//       <Divider />

//       {/* Color selection */}
//       <FormControl fullWidth variant="outlined" size="small">
//         <InputLabel id="color-label">Color</InputLabel>
//         <Select
//           labelId="color-label"
//           value={color}
//           onChange={handleColorChange}
//           label="Color"
//         >
//           {shoeColors.map(option => (
//             <MenuItem key={option.value} value={option.value}>
//               <Box display="flex" alignItems="center">
//                 <Box
//                   sx={{
//                     width: 20,
//                     height: 20,
//                     borderRadius: '50%',
//                     backgroundColor: option.value,
//                     border: '1px solid #ddd',
//                     mr: 1
//                   }}
//                 />
//                 {option.label}
//               </Box>
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {/* Size selection with chart link */}
//       <Box>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//           <Typography variant="subtitle2" fontWeight={600}>Size</Typography>
//           <Link href="#" underline="hover" fontSize="0.875rem" sx={{ display: 'flex', alignItems: 'center' }}>
//             <StraightenOutlined fontSize="small" sx={{ mr: 0.5 }} />
//             Size Chart
//           </Link>
//         </Box>
//         <FormControl fullWidth variant="outlined" size="small">
//           <InputLabel id="size-label">Size</InputLabel>
//           <Select
//             labelId="size-label"
//             value={size}
//             onChange={handleSizeChange}
//             label="Size"
//           >
//             {shoeSizes.map(option => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>

//       {/* Width selection */}
//       <Box display="flex" alignItems="center">
//         <FormControl fullWidth variant="outlined" size="small">
//           <InputLabel id="width-label">Width</InputLabel>
//           <Select
//             labelId="width-label"
//             value={width}
//             onChange={handleWidthChange}
//             label="Width"
//           >
//             {shoeWidths.map(option => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <Tooltip title="Find your perfect fit: Choose narrow if you have slim feet, medium for average width, wide for broader feet, and extra wide for maximum comfort.">
//           <IconButton size="small" sx={{ ml: 1 }}>
//             <HelpOutline fontSize="small" />
//           </IconButton>
//         </Tooltip>
//       </Box>

//       <Box display="flex" alignItems="center" gap={2}>
//         <TextField
//           label="Quantity"
//           type="number"
//           InputProps={{ inputProps: { min: 1 } }}
//           value={quantity}
//           onChange={handleQuantityChange}
//           size="small"
//           sx={{ width: '100px' }}
//         />

//         <Button
//           variant="contained"
//           size="large"
//           startIcon={<AddShoppingCart />}
//           onClick={handleAddToCart}
//           disabled={!size || !color}
//           sx={{
//             flex: 1,
//             py: 1.5,
//             fontWeight: 600
//           }}
//         >
//           Add to Cart
//         </Button>

//         <IconButton
//           size="large"
//           onClick={toggleFavorite}
//           color={isFavorite ? "primary" : "default"}
//           sx={{
//             border: '1px solid',
//             borderColor: 'divider'
//           }}
//         >
//           {isFavorite ? <Favorite /> : <FavoriteBorder />}
//         </IconButton>
//       </Box>

//       <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, mt: 2 }}>
//         <Stack spacing={2}>
//           <Box display="flex" alignItems="center" gap={1}>
//             <LocalShipping color="primary" />
//             <Typography variant="body2">
//               Free shipping on orders over $75
//             </Typography>
//           </Box>

//           <Box display="flex" alignItems="center" gap={1}>
//             <VerifiedUser color="primary" />
//             <Typography variant="body2">
//               1-year warranty against manufacturing defects
//             </Typography>
//           </Box>

//           <Box display="flex" alignItems="center" gap={1}>
//             <Loop color="primary" />
//             <Typography variant="body2">
//               60-day test run: return if not satisfied
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>

//       <Snackbar
//         open={showCartNotification}
//         autoHideDuration={4000}
//         onClose={() => setShowCartNotification(false)}
//       >
//         <Alert
//           severity="success"
//           variant="filled"
//           onClose={() => setShowCartNotification(false)}
//         >
//           Shoes added to your cart!
//         </Alert>
//       </Snackbar>
//     </Stack>
//   );
// }
