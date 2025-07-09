import { notFound } from "next/navigation";

import { Container, Grid, Box } from "@mui/material";
import { getSingleProduct } from "@/Services/ProductServices/GetSingleProduct";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: product } = await getSingleProduct(params.id);

  if (!product) {
    return notFound();
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        {/* Product Gallery */}
        <Grid size={{ xs: 12, md: 6 }}>
          {/* <ProductGallery product={product} /> */}
        </Grid>

        {/* Product Details */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* <ProductInfo product={product} /> */}
        </Grid>
      </Grid>

      {/* Tabbed Product Information */}
      <Box mt={8}>{/* <ProductTabs product={product} /> */}</Box>
    </Container>
  );
}
