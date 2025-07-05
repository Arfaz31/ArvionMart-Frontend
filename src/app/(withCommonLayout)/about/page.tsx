"use client";

import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Button,
  useTheme,
} from "@mui/material";
import { LocalShipping, Diamond, Groups, Star } from "@mui/icons-material";

const About = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url('https://res.cloudinary.com/dnom0fr0x/image/upload/v1744889993/vukudhtp36s-1744889993693-image-about-bg-121.jpg')
        `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          py: 12,
          textAlign: "center",
          width: "100%",
          height: "100%",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 3,
              [theme.breakpoints.down("sm")]: {
                fontSize: "2.5rem",
              },
            }}
          >
            Our Story at PrimeShoes
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Premium footwear for the modern lifestyle
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: 600,
            }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 3,
              }}
            >
              Redefining Footwear Excellence
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem" }}>
              Founded in 2020, PrimeShoes began with a simple mission: to create
              footwear that combines unparalleled comfort with cutting-edge
              style. Our designers work with premium materials to craft shoes
              that perform as good as they look.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
              Every pair in our collection undergoes rigorous testing to ensure
              durability, comfort, and style that lasts. We partner with ethical
              manufacturers who share our commitment to quality and
              sustainability.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
                height: "100%",
                minHeight: 400,
                backgroundImage:
                  "url('https://res.cloudinary.com/dnom0fr0x/image/upload/v1744890439/ycoeap4hpd-1744890438886-image-cardimage.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ backgroundColor: theme.palette.grey[50], py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              mb: 6,
            }}
          >
            Our Core Values
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <Diamond fontSize="large" />,
                title: "Quality Craftsmanship",
                description:
                  "Each pair is meticulously crafted using premium materials and time-honored techniques.",
              },
              {
                icon: <Star fontSize="large" />,
                title: "Innovative Design",
                description:
                  "We push boundaries with contemporary styles that don't compromise on comfort.",
              },
              {
                icon: <LocalShipping fontSize="large" />,
                title: "Reliable Service",
                description:
                  "Fast shipping and hassle-free returns because your satisfaction matters.",
              },
              {
                icon: <Groups fontSize="large" />,
                title: "Community Focused",
                description:
                  "We support local artisans and sustainable practices in our supply chain.",
              },
            ].map((item, index) => (
              <Grid size={{ xs: 12, sm: 3, md: 6 }} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    boxShadow: 0,
                    border: `1px solid ${theme.palette.divider}`,
                    "&:hover": {
                      boxShadow: 2,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <Avatar
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        width: 60,
                        height: 60,
                        mb: 3,
                        mx: "auto",
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            mb: 6,
          }}
        >
          Meet The Founders
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {[
            {
              name: "Alex Morgan",
              role: "CEO & Lead Designer",
              image: "/team-alex.jpg",
            },
            {
              name: "Jordan Taylor",
              role: "Head of Operations",
              image: "/team-jordan.jpg",
            },
            {
              name: "Casey Smith",
              role: "Marketing Director",
              image: "/team-casey.jpg",
            },
          ].map((member, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Box sx={{ textAlign: "center" }}>
                <Avatar
                  src={member.image}
                  sx={{
                    width: 200,
                    height: 200,
                    mx: "auto",
                    mb: 3,
                    boxShadow: 3,
                  }}
                />
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {member.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {member.role}
                </Typography>
                <Divider sx={{ my: 2, mx: "auto", width: "50%" }} />
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                  {/* Social icons would go here */}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url('https://res.cloudinary.com/dnom0fr0x/image/upload/v1744890566/pvm96qsph3-1744890566234-image-about-bg2222.jpg')
        `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          py: 8,
          textAlign: "center",
          width: "100%",
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
          >
            Ready to Step Into Premium Footwear?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Experience the PrimeShoes difference today
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: 600,
              backgroundColor: "white",
              color: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.grey[200],
              },
            }}
          >
            Browse Collections
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
