import { Container, Grid, Box } from "@mui/material";
import { getSingleProduct } from "@/Services/ProductServices/GetSingleProduct";
import ProductGallery from "../../_component/ProductDetails/ProductGallery";
import ProductInfo from "../../_component/ProductDetails/ProductInfo";
import ProductTabs from "../../_component/ProductDetails/ProductTabs";
import RelatedProduct from "../../_component/ProductDetails/RelatedProduct";

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: product } = await getSingleProduct(params.id);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
        <Grid container spacing={4} maxWidth="1200px">
          {/* Product Gallery */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductGallery product={product} />
          </Grid>

          {/* Product Details */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductInfo product={product} />
          </Grid>
        </Grid>
      </Box>

      {/* Tabbed Product Information */}
      <Box mt={8}>
        <ProductTabs product={product} />
      </Box>
      <Box sx={{ my: 10 }}>
        {/* Related Product */}
        <RelatedProduct currentProductId={product._id} />
      </Box>
    </Container>
  );
}
