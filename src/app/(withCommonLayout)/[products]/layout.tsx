import { Container, Grid } from "@mui/material";
import Sidebar from "../_component/AllProduct/Sidebar/Sidebar";
import ProductHeader from "../_component/AllProduct/ProductHeader/ProductHeader";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container size={12}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Sidebar />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <ProductHeader />
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductLayout;
