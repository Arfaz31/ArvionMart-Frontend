import { NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import Link from "next/link";

const ProductHeader = () => {
  return (
    <Box
      sx={{
        bgcolor: "#00a39b",
        color: "white",
        py: 4,
        mb: 4,
        borderRadius: 3,
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Products
        </Typography>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ color: "white" }}
        >
          <Link href="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
          <Link
            href="/all-products"
            style={{ color: "white", textDecoration: "none" }}
          >
            Product
          </Link>
        </Breadcrumbs>
      </Container>
    </Box>
  );
};

export default ProductHeader;
