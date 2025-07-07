/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import logo from "@/assests/logo/LogoAnimated.gif";
import Image from "next/image";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

// Import icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Divider } from "@mui/material";

const Footer = () => {
  const supportItems = [
    "About",
    "Contact",
    "Privacy Policy",
    "Shipping And Delivery",
    "Terms Of Service",
    "Return And Refund",
  ];

  const accountItems = [
    { name: "Profile", path: "/profile" },
    { name: "Orders", path: "/orders" },
    { name: "Wishlists", path: "/wishlists" },
    { name: "Settings", path: "/settings" },
  ];

  const quickLinks = [
    "New Arrivals",
    "Best Sellers",
    "Special Offers",
    "Categories",
    "Brands",
  ];

  const formatRoute = (item: string) => {
    return `/${item
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")}`;
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1a1a1a",
        color: "#fff",
        pt: 5,
        pb: 2,
        mt: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Logo and Company Info */}
          <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 5 }}>
            <Box sx={{ mb: 2 }}>
              <Image
                src={logo}
                alt="Arvion Mart Logo"
                width={160}
                height={50}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  filter: "brightness(1.2)",
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                lineHeight: 1.5,
                color: "#b0b0b0",
                fontSize: "0.85rem",
              }}
            >
              Your trusted marketplace for quality products and excellent
              service.
            </Typography>

            {/* Contact Information */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PlaceIcon sx={{ fontSize: 16, color: "#4A90E2", mr: 1 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "#b0b0b0", fontSize: "0.8rem" }}
                >
                  507-Union Trade Centre, France
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PhoneIcon sx={{ fontSize: 16, color: "#4A90E2", mr: 1 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "#b0b0b0", fontSize: "0.8rem" }}
                >
                  +33 000-000-0000
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon sx={{ fontSize: 16, color: "#4A90E2", mr: 1 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "#b0b0b0", fontSize: "0.8rem" }}
                >
                  sales@arvionmart.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid {...({} as any)} item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "#fff",
                fontSize: "1rem",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: "30px",
                  height: "2px",
                  backgroundColor: "#4A90E2",
                  bottom: "-6px",
                  left: 0,
                  borderRadius: "1px",
                },
              }}
            >
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {quickLinks.map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      color: "#b0b0b0",
                      fontSize: "0.85rem",
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: "#4A90E2",
                      },
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Your Account */}
          <Grid {...({} as any)} item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "#fff",
                fontSize: "1rem",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: "30px",
                  height: "2px",
                  backgroundColor: "#4A90E2",
                  bottom: "-6px",
                  left: 0,
                  borderRadius: "1px",
                },
              }}
            >
              Your Account
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {accountItems.map((item) => (
                <Box component="li" key={item.name} sx={{ mb: 1 }}>
                  <Link
                    href={item.path}
                    component="a"
                    sx={{
                      textDecoration: "none",
                      color: "#b0b0b0",
                      fontSize: "0.85rem",
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: "#4A90E2",
                      },
                    }}
                  >
                    {item.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Support */}
          <Grid {...({} as any)} item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "#fff",
                fontSize: "1rem",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: "30px",
                  height: "2px",
                  backgroundColor: "#4A90E2",
                  bottom: "-6px",
                  left: 0,
                  borderRadius: "1px",
                },
              }}
            >
              Support
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {supportItems.map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link
                    href={formatRoute(item)}
                    sx={{
                      textDecoration: "none",
                      color: "#b0b0b0",
                      fontSize: "0.85rem",
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: "#4A90E2",
                      },
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Social Media & Follow Us */}
          <Grid {...({} as any)} item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "#fff",
                fontSize: "1rem",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: "30px",
                  height: "2px",
                  backgroundColor: "#4A90E2",
                  bottom: "-6px",
                  left: 0,
                  borderRadius: "1px",
                },
              }}
            >
              Follow Us
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                color: "#b0b0b0",
                lineHeight: 1.4,
                fontSize: "0.8rem",
              }}
            >
              Stay connected for latest updates and offers.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <IconButton
                size="small"
                sx={{
                  color: "#3b5998",
                  bgcolor: "rgba(59, 89, 152, 0.1)",
                  border: "1px solid rgba(59, 89, 152, 0.3)",
                  "&:hover": {
                    bgcolor: "rgba(59, 89, 152, 0.2)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                  width: 36,
                  height: 36,
                }}
              >
                <FacebookIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#1DA1F2",
                  bgcolor: "rgba(29, 161, 242, 0.1)",
                  border: "1px solid rgba(29, 161, 242, 0.3)",
                  "&:hover": {
                    bgcolor: "rgba(29, 161, 242, 0.2)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                  width: 36,
                  height: 36,
                }}
              >
                <TwitterIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#E4405F",
                  bgcolor: "rgba(228, 64, 95, 0.1)",
                  border: "1px solid rgba(228, 64, 95, 0.3)",
                  "&:hover": {
                    bgcolor: "rgba(228, 64, 95, 0.2)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                  width: 36,
                  height: 36,
                }}
              >
                <InstagramIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#FF0000",
                  bgcolor: "rgba(255, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 0, 0, 0.3)",
                  "&:hover": {
                    bgcolor: "rgba(255, 0, 0, 0.2)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                  width: 36,
                  height: 36,
                }}
              >
                <YouTubeIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#0077B5",
                  bgcolor: "rgba(0, 119, 181, 0.1)",
                  border: "1px solid rgba(0, 119, 181, 0.3)",
                  "&:hover": {
                    bgcolor: "rgba(0, 119, 181, 0.2)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                  width: 36,
                  height: 36,
                }}
              >
                <LinkedInIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: "#333" }} />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            py: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#b0b0b0",
              fontSize: "0.8rem",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            © {new Date().getFullYear()} Arvion Mart. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#b0b0b0",
              fontSize: "0.8rem",
              textAlign: { xs: "center", md: "right" },
            }}
          >
            Developed with ❤️ by{" "}
            <Link
              href="https://www.arviontech.online"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#4A90E2",
                textDecoration: "none",
                fontWeight: 600,
                "&:hover": {
                  color: "#5BA3F5",
                },
              }}
            >
              Arvion Tech
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
