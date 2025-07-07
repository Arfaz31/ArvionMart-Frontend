// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import * as React from "react";
// import Box from "@mui/material/Box";
// import Tabs, { tabsClasses } from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import { Button, Container, Divider, Grid, Typography } from "@mui/material";
// import { useGetAllProductsQuery } from "@/redux/api/productApi";
// import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
// import ProductCard from "../../ProductCard/ProductCard";
// import { IProduct } from "@/types/types";
// import { TrendingUp } from "@mui/icons-material";
// import Link from "next/link";

// interface ICategory {
//   _id: string;
//   categoryName: string;
// }

// const HomeProduct = () => {
//   const [filterData, setFilterData] = React.useState<
//     { key: string; value: any }[]
//   >([{ key: "category", value: "MEN" }]);
//   const [value, setValue] = React.useState(0);

//   const { data: category } = useGetCategoriesQuery("");

//   const { data: productData } = useGetAllProductsQuery("");

//   const a11yProps = (index: number) => {
//     return {
//       id: `simple-tab-${index}`,
//       "aria-controls": `simple-tabpanel-${index}`,
//     };
//   };

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//     setFilterData([
//       {
//         key: "category",
//         value: category?.data[newValue]?.categoryName,
//       },
//     ]);
//   };

//   return (
//     <Box sx={{ paddingBottom: "50px" }}>
//       <Container>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             marginBottom: "40px",
//           }}
//         >
//           <TrendingUp sx={{ mr: 1, color: "primary.main", fontSize: 28 }} />
//           <Typography
//             variant="h4"
//             component="h2"
//             sx={{
//               fontWeight: 700,
//               position: "relative",
//             }}
//           >
//             New Arrivals
//             <Divider
//               sx={{
//                 width: "40%",
//                 mt: 1,
//                 mb: 0,
//                 borderColor: "primary.main",
//                 borderWidth: 2,
//               }}
//             />
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             flexGrow: 1,
//             maxWidth: { xs: 320, sm: 480, lg: "100%" },
//             bgcolor: "background.paper",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             mb: 4,
//           }}
//         >
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             variant="scrollable"
//             scrollButtons
//             aria-label="visible arrows tabs example"
//             sx={{
//               [`& .${tabsClasses.scrollButtons}`]: {
//                 "&.Mui-disabled": { opacity: 0.3 },
//               },
//             }}
//           >
//             {category?.data?.map((category: ICategory, index: number) => (
//               <Tab
//                 key={category._id}
//                 label={category.categoryName}
//                 {...a11yProps(index)}
//               />
//             ))}
//           </Tabs>
//         </Box>

//         <Grid container spacing={3}>
//           {productData?.data?.map((product: IProduct) => (
//             <Grid key={product._id}>
//               <ProductCard product={product} />
//             </Grid>
//           ))}
//         </Grid>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             marginTop: "40px",
//           }}
//         >
//           <Link href="/all-products">
//             <Button variant="outlined" color="primary" sx={{ px: 10, py: 1 }}>
//               View All
//             </Button>
//           </Link>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default HomeProduct;
