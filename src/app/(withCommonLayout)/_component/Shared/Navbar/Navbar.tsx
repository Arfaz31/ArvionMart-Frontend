/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { logout } from "@/Services/authServices";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import logo from "@/assests/logo/LogoAnimated.gif";
import Image from "next/image";

type UserProps = {
  user?: {
    _id?: string | null | undefined;
    userId?: string | null | undefined;
    email?: string | null | undefined;
    role?: string | null | undefined;
  };
};

const Navbar = ({ session }: { session: UserProps | null }) => {
  const [accountAnchor, setAccountAnchor] = useState<null | HTMLElement>(null);
  const [promotionsAnchor, setPromotionsAnchor] = useState<null | HTMLElement>(
    null
  );
  const [supportAnchor, setSupportAnchor] = useState<null | HTMLElement>(null);

  const { user } = useSelector((state: RootState) => state.auth as any);

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
  const handleLogout = async () => {
    try {
      // First sign out with Next-Auth
      await signOut({ redirect: false });

      // Then clear Redux and cookies
      await logout();

      // Finally redirect
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

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
                  {user?.email || session?.user
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
                        <MenuItem
                          key="login"
                          onClick={() => router.push("/login")}
                        >
                          Login
                        </MenuItem>,
                        <MenuItem
                          key="register"
                          onClick={() => router.push("/register")}
                        >
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
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 2,
              minHeight: 64,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "200px",
                flexShrink: 0,
              }}
            >
              <Link
                href="/"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "48px",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "160px",
                    height: "70px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={logo}
                    alt="Arvion Mart Logo"
                    width={160}
                    height={70}
                    style={{
                      objectFit: "contain",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                    priority
                  />
                </Box>
              </Link>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
                gap: 2,
              }}
            >
              <Link href="/" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    color: "#333",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { bgcolor: "transparent", color: "#666" },
                  }}
                  variant="text"
                >
                  Home
                </Button>
              </Link>

              <CategoryDropdown />

              <Link href="/brands" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    color: "#333",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { bgcolor: "transparent", color: "#666" },
                  }}
                  variant="text"
                >
                  All Brands
                </Button>
              </Link>

              <Button
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleSupportOpen}
                sx={{
                  color: "#333",
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

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "300px",
                justifyContent: "flex-end",
                flexShrink: 0,
                gap: 1,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "#1565c0",
                  },
                  "&:focus-within": {
                    borderColor: "#1565c0",
                    boxShadow: "0 0 0 3px rgba(21, 101, 192, 0.1)",
                  },
                }}
              >
                <InputBase
                  placeholder="Search..."
                  sx={{
                    ml: 2,
                    flex: 1,
                    fontSize: "0.875rem",
                    color: "#374151",
                    width: { xs: "80px", sm: "140px" },
                    "& .MuiInputBase-input": {
                      padding: "10px 0",
                      "&::placeholder": {
                        color: "#9ca3af",
                        opacity: 1,
                      },
                    },
                  }}
                />
                <IconButton
                  type="button"
                  aria-label="search"
                  sx={{
                    p: "8px",
                    mr: 0.5,
                    color: "#6b7280",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#1565c0",
                      backgroundColor: "rgba(21, 101, 192, 0.05)",
                    },
                  }}
                >
                  <SearchIcon sx={{ fontSize: "1.1rem" }} />
                </IconButton>
              </Box>

              <IconButton aria-label="favorites" sx={{ color: "#555" }}>
                <Badge badgeContent={0} color="error">
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>

              <IconButton aria-label="cart" sx={{ color: "#555" }}>
                <Badge badgeContent={0} color="error">
                  <ShoppingBagOutlinedIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
