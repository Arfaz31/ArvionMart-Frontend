/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllProducts } from "@/Services/ProductServices/getAllProducts";
import { Box, Grid } from "@mui/material";
import ProductCard from "../_component/ProductCard/ProductCard";
import MPagination from "../_component/MPagination/MPagination";
import ProductToolbar from "../_component/AllProduct/ProductHeader/ProductToolbar";

const AllProducts = async ({ searchParams }: any) => {
  const productData = await getAllProducts(searchParams);

  return (
    <Box>
      <Box sx={{ my: 2 }}>
        <ProductToolbar />
      </Box>
      <Grid spacing={2} container size={12}>
        {productData?.data?.map((product: any) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3 }} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <Grid container justifyContent="center" sx={{ mt: 4 }} size={12}>
        <MPagination meta={productData?.meta} />
      </Grid>
    </Box>
  );
};

export default AllProducts;
