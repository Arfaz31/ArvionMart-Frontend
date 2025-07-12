/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllProducts } from "@/Services/ProductServices/getAllProducts";
import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "../_component/ProductCard/ProductCard";
import MPagination from "../_component/MPagination/MPagination";
import ProductToolbar from "../_component/AllProduct/ProductHeader/ProductToolbar";
import SearchIcon from "@mui/icons-material/Search";

const AllProducts = async ({ searchParams }: any) => {
  const productData = await getAllProducts(searchParams);

  return (
    <Box sx={{ py: 5 }}>
      <Box sx={{ my: 2 }}>
        <ProductToolbar />
      </Box>
      {productData?.data?.length > 0 ? (
        <Grid spacing={2} container size={12}>
          {productData?.data?.map((product: any) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3 }} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <SearchIcon sx={{ fontSize: 60, color: "gray" }} />
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "gray" }}>
            No Product Found
          </Typography>
        </Box>
      )}

      {productData?.data?.length > 0 && (
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <MPagination meta={productData?.meta} />
        </Grid>
      )}
    </Box>
  );
};

export default AllProducts;
