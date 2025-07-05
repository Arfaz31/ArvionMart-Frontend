import React from "react";
import Link from "next/link";
import { Box, Button, Typography, Divider, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #f9fafb 0%, #ffffff 50%, #f3f4f6 100%)",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: "1200px",
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Grid container>
          {/* Left column - Visual */}
          <Grid
            size={{ xs: 12, md: 6 }} // Using size prop instead of xs/md directly
            sx={{
              position: "relative",
              overflow: "hidden",
              backgroundColor: "black",
              color: "white",
              p: 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                opacity: 0.1,
                "& svg": {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                },
              }}
            >
              <svg viewBox="0 0 400 400">
                <defs>
                  <pattern
                    id="pattern"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M0 20 L40 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <path
                      d="M20 0 L20 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#pattern)"
                />
              </svg>
            </Box>

            <Box sx={{ position: "relative", zIndex: 10 }}>
              <Typography
                variant="h3"
                component="h1"
                sx={{ fontWeight: "bold", mb: 3 }}
              >
                Exclusive Designer Collaboration
              </Typography>
              <Divider
                sx={{
                  width: "64px",
                  backgroundColor: "rgba(255,255,255,0.3)",
                  my: 3,
                }}
              />
              <Typography
                variant="h5"
                component="h2"
                sx={{ fontWeight: "medium", mb: 2 }}
              >
                Luxury meets performance
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "rgba(255,255,255,0.7)", mb: 4 }}
              >
                Our signature collection crafted with premium materials and
                innovative technology.
              </Typography>
            </Box>

            <Box sx={{ position: "relative", zIndex: 10, mt: 4 }}>
              <Button
                variant="contained"
                sx={{
                  px: 3,
                  py: 1.5,
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: "medium",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                View Collection
              </Button>
            </Box>
          </Grid>

          {/* Right column - 404 Content */}
          <Grid
            size={{ xs: 12, md: 6 }} // Using size prop instead of xs/md directly
            sx={{
              p: 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h1"
                component="h1"
                sx={{ fontWeight: "bold", mb: 2, color: "rgba(0,0,0,0.8)" }}
              >
                404
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: 600, mb: 1, color: "rgba(0,0,0,0.7)" }}
              >
                Page not found
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(0,0,0,0.5)" }}>
                Sorry, we couldn&apos;t find the page you&apos;re looking for.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Link href="/" passHref>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    px: 3,
                    py: 1.5,
                    backgroundColor: "black",
                    color: "white",
                    fontWeight: "medium",
                    borderRadius: "4px",
                    boxShadow: 1,
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.8)",
                    },
                  }}
                >
                  Back to Homepage
                </Button>
              </Link>

              <Link href="/contact" passHref>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderColor: "rgba(0,0,0,0.12)",
                    color: "rgba(0,0,0,0.7)",
                    fontWeight: "medium",
                    borderRadius: "4px",
                    "&:hover": {
                      borderColor: "black",
                      color: "black",
                    },
                  }}
                >
                  Contact Support
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;
