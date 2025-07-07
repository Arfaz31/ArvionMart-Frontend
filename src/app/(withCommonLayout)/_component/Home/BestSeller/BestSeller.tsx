// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import {
//   Box,
//   Typography,
//   Card,
//   Button,
//   Skeleton,
//   Container,
//   Divider,
//   IconButton,
//   Grid,
// } from "@mui/material";
// import { TrendingUp, ChevronLeft, ChevronRight } from "@mui/icons-material";
// import { useGetAllProductsQuery } from "@/redux/api/productApi";
// import { IProduct } from "@/types/types";
// import ProductCard from "../../ProductCard/ProductCard";

// const BestSellers = () => {
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [itemsToShow, setItemsToShow] = useState(4);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const { data: productData } = useGetAllProductsQuery([
//     {
//       key: "isNewArrival",
//       value: true,
//     },
//   ]);

//   // Handle responsive items count
//   useEffect(() => {
//     const updateItemsToShow = () => {
//       const width = window.innerWidth;
//       if (width < 600) setItemsToShow(1);
//       else if (width < 900) setItemsToShow(2);
//       else if (width < 1200) setItemsToShow(3);
//       else setItemsToShow(4);
//     };

//     updateItemsToShow();
//     window.addEventListener("resize", updateItemsToShow);
//     return () => window.removeEventListener("resize", updateItemsToShow);
//   }, []);

//   // Simulate loading state for demo purposes
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   const handlePrev = () => {
//     setCurrentIndex((prev) => Math.max(0, prev - 1));
//   };

//   const handleNext = () => {
//     if (!productData?.data) return;
//     setCurrentIndex((prev) =>
//       Math.min(prev + 1, productData.data.length - itemsToShow)
//     );
//   };

//   const getTransformValue = () => {
//     if (!containerRef.current) return 0;
//     const itemWidth = containerRef.current.offsetWidth / itemsToShow;
//     return -currentIndex * itemWidth;
//   };

//   return (
//     <Box component="section" sx={{ py: 10, backgroundColor: "transparent" }}>
//       {" "}
//       {/* Changed bg to transparent */}
//       <Container maxWidth="xl">
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             mb: 4,
//             justifyContent: "space-between",
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <TrendingUp sx={{ mr: 1, color: "primary.main", fontSize: 28 }} />
//             <Typography
//               variant="h4"
//               component="h2"
//               sx={{
//                 fontWeight: 700,
//                 position: "relative",
//               }}
//             >
//               Best Sellers
//               <Divider
//                 sx={{
//                   width: "40%",
//                   mt: 1,
//                   mb: 0,
//                   borderColor: "primary.main",
//                   borderWidth: 2,
//                 }}
//               />
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <IconButton
//               onClick={handlePrev}
//               disabled={currentIndex === 0}
//               sx={{
//                 border: "1px solid",
//                 borderColor: "divider",
//                 borderRadius: 1,
//               }}
//             >
//               <ChevronLeft />
//             </IconButton>
//             <IconButton
//               onClick={handleNext}
//               disabled={
//                 !productData?.data ||
//                 currentIndex >= productData.data.length - itemsToShow
//               }
//               sx={{
//                 border: "1px solid",
//                 borderColor: "divider",
//                 borderRadius: 1,
//               }}
//             >
//               <ChevronRight />
//             </IconButton>
//             <Link
//               href="/products/best-sellers"
//               style={{ textDecoration: "none" }}
//             >
//               <Button variant="outlined" size="small" sx={{ fontWeight: 500 }}>
//                 View All
//               </Button>
//             </Link>
//           </Box>
//         </Box>

//         {loading ? (
//           <Grid container spacing={3} justifyContent="center">
//             {[...Array(4)].map((_, index) => (
//               <Grid container key={index}>
//                 {" "}
//                 {/* Fixed grid item props */}
//                 <Card
//                   sx={{
//                     height: "100%",
//                     width: "100%",
//                     borderRadius: 2,
//                     overflow: "hidden",
//                     boxShadow: "none", // Remove shadow
//                     backgroundColor: "transparent", // Make card background transparent
//                   }}
//                 >
//                   <Skeleton variant="rectangular" height={200} />
//                   <Box sx={{ p: 2 }}>
//                     <Skeleton variant="text" height={30} />
//                     <Skeleton variant="text" width="60%" height={24} />
//                   </Box>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Box
//             sx={{
//               overflow: "hidden",
//               position: "relative",
//               width: "100%",
//               backgroundColor: "transparent", // Ensure container is transparent
//             }}
//           >
//             <Box
//               ref={containerRef}
//               sx={{
//                 display: "flex",
//                 transition: "transform 0.3s ease",
//                 transform: `translateX(${getTransformValue()}px)`,
//                 width: "100%",
//               }}
//             >
//               {productData?.data?.map((product: IProduct) => (
//                 <Box
//                   key={product._id}
//                   sx={{
//                     flex: `0 0 calc(100% / ${itemsToShow})`,
//                     px: 1,
//                     backgroundColor: "transparent", // Ensure item container is transparent
//                   }}
//                 >
//                   <ProductCard product={product} />
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default BestSellers;
