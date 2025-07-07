// // src/components/product/ProductTabs.tsx
// 'use client';

// import { useState, SyntheticEvent } from 'react';
// import { Products } from '@/types/types';
// import {
//   Box,
//   Tabs,
//   Tab,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Paper,
//   Divider,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Avatar,
//   Rating,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Card,
//   CardContent,
//   Chip
// } from '@mui/material';
// import {
//   ExpandMore,
//   Check,
//   QuestionAnswer,
//   DirectionsRun,
//   StraightenOutlined,
//   Construction,
//   LocalOffer
// } from '@mui/icons-material';

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`product-tabpanel-${index}`}
//       aria-labelledby={`product-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

// interface ProductTabsProps {
//   product: Products;
// }

// export default function ProductTabs({ product }: ProductTabsProps) {
//   const [value, setValue] = useState(0);

//   const handleChange = (event: SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   return (
//     <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           variant="scrollable"
//           scrollButtons="auto"
//           aria-label="product information tabs"
//           sx={{
//             '& .MuiTab-root': {
//               fontSize: '1rem',
//               fontWeight: 600,
//               py: 2,
//             }
//           }}
//         >
//           <Tab label="Description" id="product-tab-0" />
//           <Tab label="Features" id="product-tab-1" />
//           <Tab label="Specifications" id="product-tab-2" />
//           <Tab label="Size Chart" id="product-tab-3" />
//           <Tab label="Reviews" id="product-tab-4" />
//           <Tab label="FAQs" id="product-tab-5" />
//         </Tabs>
//       </Box>

//       {/* Description Tab */}
//       <TabPanel value={value} index={0}>
//         <Grid container spacing={4}>
//         <Grid size={{xs:12, sm:6}}>
//             <Typography variant="h6" fontWeight={600} gutterBottom>
//               About these shoes
//             </Typography>
//             <Typography variant="body1" paragraph>
//               {product.description}
//             </Typography>
//             <Typography variant="body1" paragraph>
//               Designed for comfort and performance, these shoes feature innovative cushioning technology that adapts to your stride. Whether you're hitting the track, exploring urban landscapes, or just seeking all-day comfort, our revolutionary design supports your feet every step of the way.
//             </Typography>
//             <Typography variant="body1" paragraph>
//               The breathable upper material keeps your feet cool while the responsive midsole returns energy with each step. An engineered traction pattern on the outsole provides superior grip on various surfaces.
//             </Typography>
//           </Grid>
//           <Grid size={{xs:12, sm:6}}>
//             <Typography variant="h6" fontWeight={600} gutterBottom>
//               Ideal For
//             </Typography>
//             <List>
//               <ListItem sx={{ py: 0.5 }}>
//                 <ListItemIcon sx={{ minWidth: '32px' }}>
//                   <Check color="primary" />
//                 </ListItemIcon>
//                 <ListItemText primary="Daily casual wear" />
//               </ListItem>
//               <ListItem sx={{ py: 0.5 }}>
//                 <ListItemIcon sx={{ minWidth: '32px' }}>
//                   <Check color="primary" />
//                 </ListItemIcon>
//                 <ListItemText primary="Light running and jogging" />
//               </ListItem>
//               <ListItem sx={{ py: 0.5 }}>
//                 <ListItemIcon sx={{ minWidth: '32px' }}>
//                   <Check color="primary" />
//                 </ListItemIcon>
//                 <ListItemText primary="Gym and fitness activities" />
//               </ListItem>
//               <ListItem sx={{ py: 0.5 }}>
//                 <ListItemIcon sx={{ minWidth: '32px' }}>
//                   <Check color="primary" />
//                 </ListItemIcon>
//                 <ListItemText primary="All-day comfort for work or travel" />
//               </ListItem>
//             </List>
//           </Grid>
//         </Grid>
//       </TabPanel>

//       {/* Features Tab */}
//       <TabPanel value={value} index={1}>
//         <Grid container spacing={3}>
//           {[
//             {
//               icon: <DirectionsRun color="primary" fontSize="large" />,
//               title: "Responsive Cushioning",
//               description: "Energy-returning midsole provides bounce in every step, reducing fatigue during extended wear."
//             },
//             {
//               icon: <StraightenOutlined color="primary" fontSize="large" />,
//               title: "Anatomical Fit",
//               description: "Designed to follow the natural contours of your foot for a snug, comfortable fit that reduces pressure points."
//             },
//             {
//               icon: <Construction color="primary" fontSize="large" />,
//               title: "Durable Construction",
//               description: "Premium materials and reinforced stitching ensure these shoes can handle your daily activities for months to come."
//             },
//             {
//               icon: <LocalOffer color="primary" fontSize="large" />,
//               title: "Breathable Materials",
//               description: "Engineered mesh upper allows air circulation to keep your feet cool and dry throughout the day."
//             }
//           ].map((feature, index) => (
//             <Grid size={{xs:12, sm:6, md:3}} key={index}>
//               <Card
//                 variant="outlined"
//                 sx={{
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   textAlign: 'center',
//                   p: 2,
//                   border: '1px solid',
//                   borderColor: 'divider',
//                   borderRadius: 2,
//                   transition: 'all 0.3s',
//                   '&:hover': {
//                     boxShadow: 3,
//                     borderColor: 'primary.main',
//                   }
//                 }}
//               >
//                 <Box sx={{ p: 2 }}>
//                   {feature.icon}
//                 </Box>
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography gutterBottom variant="h6" component="h3" fontWeight={600}>
//                     {feature.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {feature.description}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         <Box mt={4}>
//           <Typography variant="h6" fontWeight={600} gutterBottom>
//             Key Features
//           </Typography>
//           <List>
//             {(product.features || []).map((feature, index) => (
//               <ListItem key={index} sx={{ py: 0.5 }}>
//                 <ListItemIcon sx={{ minWidth: '32px' }}>
//                   <Check color="primary" />
//                 </ListItemIcon>
//                 <ListItemText primary={feature} />
//               </ListItem>
//             ))}
//             <ListItem sx={{ py: 0.5 }}>
//               <ListItemIcon sx={{ minWidth: '32px' }}>
//                 <Check color="primary" />
//               </ListItemIcon>
//               <ListItemText primary="Impact-absorbing heel counter for stability" />
//             </ListItem>
//             <ListItem sx={{ py: 0.5 }}>
//               <ListItemIcon sx={{ minWidth: '32px' }}>
//                 <Check color="primary" />
//               </ListItemIcon>
//               <ListItemText primary="Reflective elements for visibility in low light" />
//             </ListItem>
//             <ListItem sx={{ py: 0.5 }}>
//               <ListItemIcon sx={{ minWidth: '32px' }}>
//                 <Check color="primary" />
//               </ListItemIcon>
//               <ListItemText primary="Quick-lace system for easy on/off" />
//             </ListItem>
//           </List>
//         </Box>
//       </TabPanel>

//       {/* Specifications Tab */}
//       <TabPanel value={value} index={2}>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 600 }}>Specification</TableCell>
//                 <TableCell sx={{ fontWeight: 600 }}>Details</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell>Upper Material</TableCell>
//                 <TableCell>Engineered mesh with synthetic overlays</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>Midsole</TableCell>
//                 <TableCell>EVA foam with responsive cushioning</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>Outsole</TableCell>
//                 <TableCell>Carbon rubber with multi-directional tread pattern</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>Heel-to-Toe Drop</TableCell>
//                 <TableCell>10mm</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>Weight</TableCell>
//                 <TableCell>10.5 oz (297g) for men's size 9</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>Width Options</TableCell>
//                 <TableCell>Narrow (B), Medium (D), Wide (E), Extra Wide (EE)</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>Arch Support</TableCell>
//                 <TableCell>Moderate</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>Closure</TableCell>
//                 <TableCell>Traditional lace-up with reinforced eyelets</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>Recommended For</TableCell>
//                 <TableCell>Neutral runners and walkers</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>Care Instructions</TableCell>
//                 <TableCell>Spot clean with mild detergent and warm water</TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </TabPanel>

//       {/* Size Chart Tab */}
//       <TabPanel value={value} index={3}>
//         <Typography variant="h6" fontWeight={600} gutterBottom>
//           Shoe Size Chart
//         </Typography>
//         <Typography variant="body2" color="text.secondary" paragraph>
//           Measure your foot from heel to toe while standing and refer to this chart to find your perfect size.
//         </Typography>

//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 600 }}>US Men's</TableCell>
//                 <TableCell sx={{ fontWeight: 600 }}>US Women's</TableCell>
//                 <TableCell sx={{ fontWeight: 600 }}>UK</TableCell>
//                 <TableCell sx={{ fontWeight: 600 }}>EU</TableCell>
//                 <TableCell sx={{ fontWeight: 600 }}>Foot Length (cm)</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell>6</TableCell>
//                 <TableCell>7.5</TableCell>
//                 <TableCell>5.5</TableCell>
//                 <TableCell>39</TableCell>
//                 <TableCell>24.1</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>7</TableCell>
//                 <TableCell>8.5</TableCell>
//                 <TableCell>6.5</TableCell>
//                 <TableCell>40</TableCell>
//                 <TableCell>24.8</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>8</TableCell>
//                 <TableCell>9.5</TableCell>
//                 <TableCell>7.5</TableCell>
//                 <TableCell>41</TableCell>
//                 <TableCell>25.4</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>9</TableCell>
//                 <TableCell>10.5</TableCell>
//                 <TableCell>8.5</TableCell>
//                 <TableCell>42</TableCell>
//                 <TableCell>26.0</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>10</TableCell>
//                 <TableCell>11.5</TableCell>
//                 <TableCell>9.5</TableCell>
//                 <TableCell>43</TableCell>
//                 <TableCell>26.7</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>11</TableCell>
//                 <TableCell>12.5</TableCell>
//                 <TableCell>10.5</TableCell>
//                 <TableCell>44</TableCell>
//                 <TableCell>27.3</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>12</TableCell>
//                 <TableCell>13.5</TableCell>
//                 <TableCell>11.5</TableCell>
//                 <TableCell>45</TableCell>
//                 <TableCell>27.9</TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box mt={4}>
//           <Typography variant="h6" fontWeight={600} gutterBottom>
//             Width Guide
//           </Typography>
//           <Grid container spacing={2}>
//           <Grid size={{xs:12, sm:6}}>
//               <TableContainer>
//                 <Table size="small">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 600 }}>Width</TableCell>
//                       <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell>B</TableCell>
//                       <TableCell>Narrow</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell>D</TableCell>
//                       <TableCell>Medium (Standard)</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell>E</TableCell>
//                       <TableCell>Wide</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell>EE</TableCell>
//                       <TableCell>Extra Wide</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Grid>
//             <Grid size={{xs:12, sm:6}}>
//               <Box p={2} bgcolor="grey.100" borderRadius={2}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>
//                   How to Measure Your Width
//                 </Typography>
//                 <Typography variant="body2">
//                   Measure the widest part of your foot (usually the ball of the foot). Compare this measurement with your foot length to determine your width category.
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>

//         <Box mt={4}>
//           <Typography variant="h6" fontWeight={600} gutterBottom>
//             Fit Tips
//           </Typography>
//           <List>
//             <ListItem>
//               <ListItemIcon>
//                 <Check color="primary" />
//               </ListItemIcon>
//               <ListItemText
//                 primary="If you're between sizes, we recommend sizing up."
//                 secondary="Your feet may swell during the day, especially after physical activity."
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemIcon>
//                 <Check color="primary" />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Try on shoes at the end of the day."
//                 secondary="This is when your feet are at their largest."
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemIcon>
//                 <Check color="primary" />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Leave about a thumb's width of space at the toe."
//                 secondary="This ensures proper fit and prevents toe discomfort."
//               />
//             </ListItem>
//           </List>
//         </Box>
//       </TabPanel>

//       {/* Reviews Tab */}
//       {/* Reviews Tab */}
// <TabPanel value={value} index={4}>
//   <Box display="flex" alignItems="center" mb={4}>
//     <Box mr={4}>
//       <Typography variant="h3" fontWeight={700} color="primary.main">
//         4.8
//       </Typography>
//       <Rating value={4.8} precision={0.1} readOnly />
//       <Typography variant="body2" color="text.secondary">
//         Based on 127 reviews
//       </Typography>
//     </Box>
//     <Box flexGrow={1}>
//       {[
//         { rating: 5, percent: 85 },
//         { rating: 4, percent: 10 },
//         { rating: 3, percent: 3 },
//         { rating: 2, percent: 1 },
//         { rating: 1, percent: 1 }
//       ].map((item) => (
//         <Box key={item.rating} display="flex" alignItems="center" mb={0.5}>
//           <Typography variant="body2" sx={{ minWidth: '30px' }}>
//             {item.rating}★
//           </Typography>
//           <Box
//             sx={{
//               flexGrow: 1,
//               mx: 1,
//               height: 8,
//               bgcolor: 'grey.200',
//               borderRadius: 1,
//               overflow: 'hidden'
//             }}
//           >
//             <Box
//               sx={{
//                 width: `${item.percent}%`,
//                 height: '100%',
//                 bgcolor: 'primary.main'
//               }}
//             />
//           </Box>
//           <Typography variant="body2" color="text.secondary">
//             {item.percent}%
//           </Typography>
//         </Box>
//       ))}
//     </Box>
//   </Box>

//   <Divider sx={{ my: 3 }} />

//   {/* Fix the reviews section here */}
//   {[
//     {
//       name: 'Sarah J.',
//       rating: 5,
//       date: '2 months ago',
//       verified: true,
//       title: 'Best running shoes I\'ve ever had',
//       comment: 'These shoes have completely changed my running experience. The cushioning is incredible, and my usual knee pain has disappeared. I\'ve already recommended these to my running group.',
//       helpful: 34
//     },
//     {
//       name: 'Michael T.',
//       rating: 4,
//       date: '1 month ago',
//       verified: true,
//       title: 'Great daily shoes, but sizing runs small',
//       comment: 'Very comfortable for everyday wear and light exercise. My only complaint is that they run about half a size small. I recommend ordering up if you\'re between sizes.',
//       helpful: 22
//     },
//     {
//       name: 'David L.',
//       rating: 5,
//       date: '3 weeks ago',
//       verified: true,
//       title: 'Perfect for my gym workouts',
//       comment: 'Been using these for weight training and HIIT workouts. They provide great stability and cushioning exactly where I need it. The grip on various surfaces is excellent.',
//       helpful: 15
//     }
//   ].map((review, index) => (
//     <Box key={index} mb={4}>
//       <Box display="flex" alignItems="center" mb={1}>
//         <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
//           {review.name.charAt(0)}
//         </Avatar>
//         <Box>
//           <Typography variant="subtitle1" fontWeight={600}>
//             {review.name}
//           </Typography>
//           <Box display="flex" alignItems="center">
//             <Rating value={review.rating} size="small" readOnly />
//             <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
//               {review.date}
//             </Typography>
//             {review.verified && (
//               <Chip
//                 label="Verified Purchase"
//                 size="small"
//                 sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
//               />
//             )}
//           </Box>
//         </Box>
//       </Box>
//       <Typography variant="subtitle2" fontWeight={600} mt={1}>
//         {review.title}
//       </Typography>
//       <Typography variant="body2" paragraph>
//         {review.comment}
//       </Typography>
//       <Box display="flex" alignItems="center">
//         <Typography variant="body2" color="text.secondary">
//           {review.helpful} people found this helpful
//         </Typography>
//       </Box>
//       {index < 2 && <Divider sx={{ my: 3 }} />}
//     </Box>
//   ))}

//   <Box textAlign="center" mt={2}>
//     <Typography variant="body2" color="primary" sx={{ cursor: 'pointer', fontWeight: 600 }}>
//       See all 127 reviews
//     </Typography>
//   </Box>
// </TabPanel>

//       {/* FAQs Tab */}
//       <TabPanel value={value} index={5}>
//         {[
//           {
//             question: 'Are these shoes true to size?',
//             answer: 'Most customers find these shoes run slightly small. We recommend ordering a half size up from your normal shoe size, especially if you plan to wear thicker socks or have a wider foot.'
//           },
//           {
//             question: 'Are these shoes waterproof?',
//             answer: 'These shoes are water-resistant but not fully waterproof. They can handle light rain and wet surfaces, but we don\'t recommend them for heavy rain or puddles. The upper material is treated with a water-repellent coating that helps keep your feet dry in most conditions.'
//           },
//           {
//             question: 'How do I clean these shoes?',
//             answer: 'For best results, spot clean with a soft cloth using mild soap and warm water. Remove the insoles and laces before cleaning, and allow shoes to air dry completely away from direct heat sources. Do not machine wash or dry as this may damage the special cushioning technology.'
//           },
//           {
//             question: 'Can I use custom orthotics with these shoes?',
//             answer: 'Yes, these shoes are designed to accommodate custom orthotics. The included insoles are removable, giving you the flexibility to use your own orthotics for personalized support and comfort.'
//           },
//           {
//             question: 'How long do these shoes typically last?',
//             answer: 'With regular use (3-4 times per week), these shoes typically maintain their cushioning and support for about 300-500 miles or 6-8 months. The exact lifespan depends on your activity level, running/walking style, and the surfaces you use them on.'
//           },
//           {
//             question: 'Do you offer a warranty?',
//             answer: 'Yes, we offer a 1-year warranty against manufacturing defects under normal use. This doesn\'t cover normal wear and tear or damage caused by improper care. Please keep your receipt as proof of purchase for warranty claims.'
//           }
//         ].map((faq, index) => (
//           <Accordion key={index} elevation={0} sx={{ '&:before': { display: 'none' } }}>
//             <AccordionSummary
//               expandIcon={<ExpandMore />}
//               sx={{
//                 px: 2,
//                 '&:hover': { bgcolor: 'grey.50' },
//                 '&.Mui-expanded': { bgcolor: 'grey.50' }
//               }}
//             >
//               <Box display="flex" alignItems="center">
//                 <QuestionAnswer color="primary" sx={{ mr: 2 }} />
//                 <Typography variant="subtitle1" fontWeight={600}>
//                   {faq.question}
//                 </Typography>
//               </Box>
//             </AccordionSummary>
//             <AccordionDetails sx={{ px: 2, pl: 6 }}>
//               <Typography variant="body1">
//                 {faq.answer}
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//         ))}

//         <Box mt={4} p={3} bgcolor="grey.50" borderRadius={2}>
//           <Typography variant="subtitle1" fontWeight={600} gutterBottom>
//             Have more questions?
//           </Typography>
//           <Typography variant="body2">
//             Our customer support team is available Monday through Friday, 9am-5pm EST.
//             Contact us at support@example.com or call 1-800-555-SHOE.
//           </Typography>
//         </Box>
//       </TabPanel>
//     </Paper>
//   );
// }
