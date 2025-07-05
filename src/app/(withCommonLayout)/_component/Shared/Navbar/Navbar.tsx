"use client";

import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";

// Import icons from MUI
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import CategoryDropdown from "./Dropdwon/CategoryDropdown";

const Navbar = () => {
  const [brandsAnchor, setBrandsAnchor] = useState<null | HTMLElement>(null);
  const [accountAnchor, setAccountAnchor] = useState<null | HTMLElement>(null);
  const [promotionsAnchor, setPromotionsAnchor] = useState<null | HTMLElement>(
    null
  );
  const [supportAnchor, setSupportAnchor] = useState<null | HTMLElement>(null);

  const { user } = useSelector((state: RootState) => state.auth);

  const handleBrandsOpen = (event: React.MouseEvent<HTMLElement>) =>
    setBrandsAnchor(event.currentTarget);
  const handleBrandsClose = () => setBrandsAnchor(null);

  const handleAccountOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAccountAnchor(event.currentTarget);
  const handleAccountClose = () => setAccountAnchor(null);

  const handlePromotionsOpen = (event: React.MouseEvent<HTMLElement>) =>
    setPromotionsAnchor(event.currentTarget);
  const handlePromotionsClose = () => setPromotionsAnchor(null);

  const handleSupportOpen = (event: React.MouseEvent<HTMLElement>) =>
    setSupportAnchor(event.currentTarget);
  const handleSupportClose = () => setSupportAnchor(null);

  const router = useRouter();
  const handleLogout = () => {
    router.push("/login");
  };

  const brandItems = [
    "Nike",
    "Adidas",
    "Puma",
    "New Balance",
    "Converse",
    "Vans",
  ];

  const accountItems = ["Profile", "Orders", "Saved Items", "Settings"];

  const promotionItems = [
    "Deals / Sale",
    "Clearance",
    "Gift Cards",
    "Track Order",
  ];
  const supportItems = [
    "About",
    "Contact",
    "Privacy Policy",
    "Shipping And Delivery",
    "Terms Of Service",
    "Return And Refund",
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: {
          xs: "none",
          sm: "block",
          lg: "block",
        },
      }}
    >
      {/* Top notification bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "#f5f5f5", color: "#666" }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ minHeight: "40px", justifyContent: "space-between" }}
          >
            <Typography variant="body2">
              Free shipping on domestic orders over $150
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  startIcon={<PersonOutlineIcon />}
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleAccountOpen}
                  variant="text"
                  color="inherit"
                  sx={{
                    fontSize: "0.875rem",
                    textTransform: "none",
                    "&:hover": { color: "#333" },
                  }}
                >
                  Account
                </Button>
                <Menu
                  anchorEl={accountAnchor}
                  open={Boolean(accountAnchor)}
                  onClose={handleAccountClose}
                  keepMounted
                >
                  {user?.email
                    ? [
                        ...accountItems.map((item) => (
                          <MenuItem key={item} onClick={handleAccountClose}>
                            {item}
                          </MenuItem>
                        )),

                        <Divider key="divider" />,

                        <MenuItem key="logout" onClick={handleLogout}>
                          Logout
                        </MenuItem>,
                      ]
                    : /* When user is not logged in */
                      [
                        <MenuItem key="login" onClick={handleAccountClose}>
                          Login
                        </MenuItem>,
                        <MenuItem key="register" onClick={handleAccountClose}>
                          Register
                        </MenuItem>,
                      ]}
                </Menu>
              </Box>

              {/* Promotions Dropdown */}
              <Button
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handlePromotionsOpen}
                sx={{
                  color: "#333",
                  mx: 1.5,
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { bgcolor: "transparent", color: "#666" },
                }}
                variant="text"
              >
                Promotions
              </Button>
              <Menu
                anchorEl={promotionsAnchor}
                open={promotionsAnchor !== null}
                onClose={handlePromotionsClose}
                keepMounted
              >
                {promotionItems.map((item) => (
                  <MenuItem key={item} onClick={handlePromotionsClose}>
                    {item === "Deals / Sale" && (
                      <LocalOfferOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                    )}
                    {item === "Gift Cards" && (
                      <CardGiftcardOutlinedIcon
                        fontSize="small"
                        sx={{ mr: 1 }}
                      />
                    )}
                    {item === "Track Order" && (
                      <LocalShippingOutlinedIcon
                        fontSize="small"
                        sx={{ mr: 1 }}
                      />
                    )}
                    {item}
                  </MenuItem>
                ))}
              </Menu>
              <Button
                startIcon={<LocalShippingOutlinedIcon />}
                color="inherit"
                variant="text"
                sx={{
                  fontSize: "0.875rem",
                  textTransform: "none",
                  "&:hover": { color: "#333" },
                }}
              >
                Track Order
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main navigation */}
      <AppBar
        position="static"
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
            sx={{ justifyContent: "space-between", py: 1 }}
          >
            {/* Logo */}
            <Link
              href="/"
              underline="none"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#20b2aa",
                  color: "white",
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  mr: 1,
                }}
              >
                <ShoppingBagOutlinedIcon />
              </Box>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 700,
                  letterSpacing: ".05rem",
                  color: "#333",
                }}
              >
                PrimeShoes
              </Typography>
            </Link>

            {/* Navigation links */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              {/* Home Link */}
              <Link href="/">
                <Button
                  sx={{
                    color: "#333",
                    mx: 1.5,
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { bgcolor: "transparent", color: "#666" },
                  }}
                  variant="text"
                >
                  Home
                </Button>
              </Link>

              {/* Categories Dropdown */}
              <CategoryDropdown />

              {/* Brands Dropdown */}
              <Button
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleBrandsOpen}
                sx={{
                  color: "#333",
                  mx: 1.5,
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { bgcolor: "transparent", color: "#666" },
                }}
                variant="text"
              >
                Brands
              </Button>
              <Menu
                anchorEl={brandsAnchor}
                open={brandsAnchor !== null}
                onClose={handleBrandsClose}
                keepMounted
              >
                {brandItems.map((item) => (
                  <MenuItem key={item} onClick={handleBrandsClose}>
                    {item}
                  </MenuItem>
                ))}
              </Menu>

              {/* About Link */}
              {/* <Link href="/about">
                <Button
                  sx={{
                    color: "#333",
                    mx: 1.5,
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { bgcolor: "transparent", color: "#666" },
                  }}
                  variant="text"
                >
                  About
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  sx={{
                    color: "#333",
                    mx: 1.5,
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { bgcolor: "transparent", color: "#666" },
                  }}
                  variant="text"
                >
                  Contact
                </Button>
              </Link> */}

              <Button
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleSupportOpen}
                sx={{
                  color: "#333",
                  mx: 1.5,
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { bgcolor: "transparent", color: "#666" },
                }}
                variant="text"
              >
                Supports
              </Button>
              <Menu
                anchorEl={supportAnchor}
                open={supportAnchor !== null}
                onClose={handleSupportClose}
                keepMounted
              >
                {supportItems.map((item) => (
                  <MenuItem
                    key={item}
                    onClick={handleSupportClose}
                    component={Link}
                    href={`/${item
                      .toLowerCase()
                      .replace(/&/g, "and")
                      .replace(/[^a-z0-9\s-]/g, "")
                      .trim()
                      .replace(/\s+/g, "-")}`}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Right icons section */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Search Bar */}
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  backgroundColor: "#f9f9f9",
                  mr: 2,
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <InputBase
                  placeholder="Search..."
                  sx={{
                    ml: 1,
                    flex: 1,
                    fontSize: "0.875rem",
                    width: { xs: "80px", sm: "140px" },
                  }}
                />
                <IconButton type="button" aria-label="search" sx={{ p: "4px" }}>
                  <SearchIcon />
                </IconButton>
              </Box>

              {/* Wishlist */}
              <IconButton aria-label="favorites" sx={{ color: "#555", mx: 1 }}>
                <Badge badgeContent={0} color="error">
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>

              {/* Shopping Cart */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton aria-label="cart" sx={{ color: "#555" }}>
                  <Badge badgeContent={0} color="error">
                    <ShoppingBagOutlinedIcon />
                  </Badge>
                </IconButton>
                {/* <Typography variant="body2" component="div" sx={{ ml: 1 }}>
                  <Typography component="span" sx={{ fontWeight: 500 }}>
                    0
                  </Typography>
                  <Typography component="span" sx={{ color: "#777" }}>
                    {" "}
                    / €0.00
                  </Typography>
                </Typography> */}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
