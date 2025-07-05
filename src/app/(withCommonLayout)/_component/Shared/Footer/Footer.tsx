/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

// Import icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GoogleIcon from "@mui/icons-material/Google";
import SendIcon from "@mui/icons-material/Send";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Divider } from "@mui/material";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#eee",
        borderTop: "1px solid #eaeaea",
        py: 5,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={12}>
          {/* Store Information */}
          <Grid {...({} as any)} item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 3,
                color: "#000",
                fontSize: "1.1rem",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: "30px",
                  height: "2px",
                  backgroundColor: "#20b2aa",
                  bottom: "-8px",
                  left: 0,
                },
              }}
            >
              Store Information
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
              <PlaceIcon
                sx={{ fontSize: 24, color: "#20b2aa", mr: 2.5, mt: 0.3 }}
              />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.6, fontSize: "0.95rem" }}
              >
                Styleway - Goggles Store
                <br />
                507-Union Trade Centre
                <br />
                France
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PhoneIcon sx={{ fontSize: 24, color: "#20b2aa", mr: 2.5 }} />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "0.95rem" }}
              >
                000-000-0000
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EmailIcon sx={{ fontSize: 24, color: "#20b2aa", mr: 2.5 }} />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "0.95rem" }}
              >
                sales@yourcompany.com
              </Typography>
            </Box>
          </Grid>

          {/* Your Account */}
          <Grid {...({} as any)} item xs={12} sm={6} md={2.5}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 3,
                color: "#000",
                fontSize: "1.1rem",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: "30px",
                  height: "2px",
                  backgroundColor: "#20b2aa",
                  bottom: "-8px",
                  left: 0,
                },
              }}
            >
              Your Account
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {["Personal info", "Orders", "Credit slips", "Addresses"].map(
                (item) => (
                  <Box component="li" key={item} sx={{ mb: 1.5 }}>
                    <Link
                      href="#"
                      underline="hover"
                      color="text.secondary"
                      sx={{
                        fontSize: "0.95rem",
                        transition: "color 0.2s",
                        "&:hover": { color: "#20b2aa" },
                      }}
                    >
                      {item}
                    </Link>
                  </Box>
                )
              )}
            </Box>
          </Grid>

          {/* Products */}
          <Grid {...({} as any)} item xs={12} sm={6} md={2.5}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 3,
                color: "#000",
                fontSize: "1.1rem",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: "30px",
                  height: "2px",
                  backgroundColor: "#20b2aa",
                  bottom: "-8px",
                  left: 0,
                },
              }}
            >
              Products
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {[
                "Prices drop",
                "New products",
                "Best sales",
                "Our best sales",
                "Sitemap",
              ].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1.5 }}>
                  <Link
                    href="#"
                    underline="hover"
                    color="text.secondary"
                    sx={{
                      fontSize: "0.95rem",
                      transition: "color 0.2s",
                      "&:hover": { color: "#20b2aa" },
                      ...(item === "Our best sales" && {
                        backgroundColor: "#f8f9fa",
                        padding: "3px 8px",
                        border: "1px solid #dee2e6",
                        borderRadius: "3px",
                      }),
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Our Company */}
          <Grid {...({} as any)} item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 3,
                color: "#000",
                fontSize: "1.1rem",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: "30px",
                  height: "2px",
                  backgroundColor: "#20b2aa",
                  bottom: "-8px",
                  left: 0,
                },
              }}
            >
              Our Company
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {[
                "Delivery",
                "Legal Notice",
                "Terms and conditions of use",
                "About us",
                "Secure payment",
              ].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1.5 }}>
                  <Link
                    href="#"
                    underline="hover"
                    color="text.secondary"
                    sx={{
                      fontSize: "0.95rem",
                      transition: "color 0.2s",
                      "&:hover": { color: "#20b2aa" },
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid {...({} as any)} item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 3,
                color: "#000",
                fontSize: "1.1rem",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: "30px",
                  height: "2px",
                  backgroundColor: "#20b2aa",
                  bottom: "-8px",
                  left: 0,
                },
              }}
            >
              Our Newsletter
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 2,
                lineHeight: 1.6,
                fontSize: "0.95rem",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe to our latest newsletter to get news about upcoming
              sales
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubscribe}
              sx={{ display: "flex", mb: 3, maxWidth: "400px" }}
            >
              <TextField
                size="small"
                placeholder="Enter Your email id"
                value={email}
                onChange={handleEmailChange}
                sx={{
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px 0 0 4px",
                    backgroundColor: "#f8f9fa",
                    "& fieldset": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#20b2aa",
                    },
                  },
                }}
                required
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#20b2aa",
                  borderRadius: "0 4px 4px 0",
                  "&:hover": { bgcolor: "#1a9690" },
                  minWidth: "40px",
                  padding: "8px",
                }}
              >
                <SendIcon />
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton
                size="medium"
                sx={{
                  color: "#3b5998",
                  padding: 0,
                  "&:hover": { color: "#20b2aa" },
                }}
              >
                <FacebookIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <IconButton
                size="medium"
                sx={{
                  color: "#1DA1F2",
                  padding: 0,
                  "&:hover": { color: "#20b2aa" },
                }}
              >
                <TwitterIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <IconButton
                size="medium"
                sx={{
                  color: "#ff6600",
                  padding: 0,
                  "&:hover": { color: "#20b2aa" },
                }}
              >
                <RssFeedIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <IconButton
                size="medium"
                sx={{
                  color: "#FF0000",
                  padding: 0,
                  "&:hover": { color: "#20b2aa" },
                }}
              >
                <YouTubeIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <IconButton
                size="medium"
                sx={{
                  color: "#db4a39",
                  padding: 0,
                  "&:hover": { color: "#20b2aa" },
                }}
              >
                <GoogleIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.95rem" }}
          >
            Copyright &copy; {new Date().getFullYear()} All rights reserved
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.95rem" }}
          >
            Developed by{" "}
            <Link
              href="https://www.arviontech.online"
              target="_blank"
              rel="noopener noreferrer"
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
