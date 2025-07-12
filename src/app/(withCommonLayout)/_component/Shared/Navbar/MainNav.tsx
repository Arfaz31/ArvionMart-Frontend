/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, AppBar, Toolbar, Container, Link, Button } from "@mui/material";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NavButtons from "./NavButtons";
import CategoryDropdown from "./Dropdwon/CategoryDropdown";
import SupportMenu from "./SupportMenu";

const MainNav = ({
  logo,
  wishlistCount,
  cartCount,
}: {
  logo: any;
  user: any;
  handleLogout: () => void;
  wishlistCount: number;
  cartCount: number;
}) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="default"
      sx={{
        bgcolor: "white",
        color: "#333",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 2,
            minHeight: 64,
          }}
        >
          <Logo logo={logo} />

          <NavLinks />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SearchBar />
            <NavButtons wishlistCount={wishlistCount} cartCount={cartCount} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const Logo = ({ logo }: { logo: any }) => (
  <Box sx={{ width: "200px", flexShrink: 0 }}>
    <Link href="/" underline="none">
      <Box sx={{ position: "relative", width: "160px", height: "70px" }}>
        <Image
          src={logo}
          alt="Logo"
          width={160}
          height={70}
          style={{ objectFit: "contain" }}
          priority
        />
      </Box>
    </Link>
  </Box>
);

const NavLinks = () => (
  <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
    <NavLink href="/all-products" text="All Products" />
    <CategoryDropdown />
    <NavLink href="/brands" text="All Brands" />
    <NavLink href="/about" text="About Us" />
    <NavLink href="/contact" text="Contact Us" />
    <SupportMenu />
  </Box>
);

const NavLink = ({ href, text }: { href: string; text: string }) => (
  <Link href={href} style={{ textDecoration: "none" }}>
    <Button
      sx={{
        color: "#333",
        textTransform: "none",
        fontWeight: 500,
        "&:hover": { bgcolor: "transparent", color: "#666" },
      }}
      variant="text"
    >
      {text}
    </Button>
  </Link>
);

export default MainNav;
