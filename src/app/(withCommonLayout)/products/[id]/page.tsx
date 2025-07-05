// src/pages/products/[id].tsx
import { notFound } from 'next/navigation';

import { Container, Grid, Box } from '@mui/material';
import ProductTabs from '../../_component/ProductsTabs/page';
import ProductInfo from '../../_component/ProductInfo/page';
import ProductGallery from '../../_component/ProductGallery/page';
import { getProduct } from '@/app/productApi';


export default async function ProductPage({ params }: { params: { id: string } }) {
  const products = await getProduct(params.id);

  if (!products) {
    return notFound();
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        {/* Product Gallery */}
        <Grid size={{xs: 12, md: 6}}>
          <ProductGallery product={products} />
        </Grid>

        {/* Product Details */}
        <Grid size={{xs: 12, md: 4}}>
          <ProductInfo product={products} />
        </Grid>
      </Grid>

      {/* Tabbed Product Information */}
      <Box mt={8}>
        <ProductTabs product={products} />
      </Box>
    </Container>
  );
}