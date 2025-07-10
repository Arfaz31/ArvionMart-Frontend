/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppBar, Toolbar, Container, Box } from "@mui/material";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NavButtons from "./NavButtons";

const MobileNav = ({
  logo,
  wishlistCount,
  cartCount,
}: {
  logo: any;
  wishlistCount: number;
  cartCount: number;
}) => {
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        color="default"
        sx={{
          display: { xs: "block", sm: "none" },
          bgcolor: "white",
          color: "#333",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Box sx={{ position: "relative", width: "120px", height: "50px" }}>
              <Image
                src={logo}
                alt="Logo"
                layout="fill"
                objectFit="contain"
                priority
              />
            </Box>
            <SearchBar mobile />
            <NavButtons
              wishlistCount={wishlistCount}
              cartCount={cartCount}
              mobile
            />
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar sx={{ display: { xs: "block", sm: "none" } }} />
    </>
  );
};

export default MobileNav;
