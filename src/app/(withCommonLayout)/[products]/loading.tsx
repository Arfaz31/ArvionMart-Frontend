import { Container, Grid, Skeleton } from "@mui/material";
import React from "react";

const ProductLoading = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Skeleton variant="text" width={250} height={50} sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {[...Array(6)].map((_, i) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={i}>
            <Skeleton variant="rectangular" height={200} />
            <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
            <Skeleton variant="text" width="60%" />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductLoading;
