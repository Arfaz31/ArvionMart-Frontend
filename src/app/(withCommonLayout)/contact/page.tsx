/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  useTheme,
  Divider,
  Paper,
  IconButton,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  WhatsApp,
  Facebook,
  Instagram,
  Twitter,
  Send,
} from "@mui/icons-material";
import { useState } from "react";

const ContactPage = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    // Show success message (in a real app)
  };

  // Contact information cards
  const contactInfo = [
    {
      icon: <Email fontSize="large" />,
      title: "Email Us",
      content: "support@primeshoes.com",
      details: "We'll respond within 24 hours",
    },
    {
      icon: <Phone fontSize="large" />,
      title: "Call Us",
      content: "+1 (800) 123-4567",
      details: "Mon-Fri, 9am-5pm EST",
    },
    {
      icon: <WhatsApp fontSize="large" />,
      title: "WhatsApp",
      content: "+1 (800) 123-4567",
      details: "Chat with our support team",
    },
    {
      icon: <LocationOn fontSize="large" />,
      title: "Visit Us",
      content: "123 Fashion Avenue",
      details: "New York, NY 10001",
    },
  ];

  return (
    <Box sx={{ py: 8 }}>
      {/* Hero Section */}
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
          py: 12,
          textAlign: "center",
          width: "100%",
          minHeight: "40vh",
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
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            We&apos;d love to hear from you. Reach out with any questions or
            feedback.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Info Cards */}
          <Grid size={{ xs: 12 }}>
            <Grid container spacing={3}>
              {contactInfo.map((info, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      boxShadow: 0,
                      border: `1px solid ${theme.palette.divider}`,
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        textAlign: "center",
                        py: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mb: 2,
                          color: "white",
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        {info.title}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {info.content}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {info.details}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Contact Form Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: 700, mb: 4 }}
            >
              Send Us a Message
            </Typography>
            <Paper
              component="form"
              onSubmit={handleSubmit}
              elevation={0}
              sx={{
                p: 4,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
              }}
            >
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    multiline
                    rows={6}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<Send />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontWeight: 600,
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Map and Store Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: 700, mb: 4 }}
            >
              Visit Our Flagship Store
            </Typography>
            {/* Map Placeholder */}
            <Box
              sx={{
                width: "100%",
                height: 300,
                backgroundColor: theme.palette.grey[200],
                borderRadius: 2,
                mb: 3,
                backgroundImage:
                  "url('https://res.cloudinary.com/dnom0fr0x/image/upload/v1744889993/vukudhtp36s-1744889993693-image-about-bg-121.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: `1px solid ${theme.palette.divider}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  borderRadius: 2,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  zIndex: 1,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  px: 3,
                  py: 1,
                  borderRadius: 1,
                }}
              >
                Interactive Map Would Display Here
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 4,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Store Hours
              </Typography>
              <Grid container spacing={1} sx={{ mb: 3 }}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body1">Monday - Friday</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body1">10:00 AM - 9:00 PM</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body1">Saturday</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body1">10:00 AM - 8:00 PM</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body1">Sunday</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body1">11:00 AM - 6:00 PM</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Follow Us
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  <Twitter />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Box sx={{ backgroundColor: theme.palette.grey[50], py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            sx={{ textAlign: "center", fontWeight: 700, mb: 6 }}
          >
            Frequently Asked Questions
          </Typography>

          <Grid container spacing={3}>
            {[
              {
                question: "What is your return policy?",
                answer:
                  "We offer a 30-day return policy on all unworn items. Please see our Returns page for more information on the process.",
              },
              {
                question: "How long does shipping take?",
                answer:
                  "Standard shipping takes 3-5 business days within the continental US. Express shipping options are available at checkout.",
              },
              {
                question: "Do you ship internationally?",
                answer:
                  "Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days depending on the destination.",
              },
              {
                question: "How can I track my order?",
                answer:
                  "Once your order ships, you'll receive a confirmation email with tracking information. You can also check your order status on your account page.",
              },
            ].map((faq, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
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
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: 600, mb: 2 }}
                    >
                      {faq.question}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              View All FAQs
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box
        sx={{
          backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
          url('https://res.cloudinary.com/dnom0fr0x/image/upload/v1744892122/1e3tu6va8au-1744892122301-image-contact1112.jpg')
        `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          py: 8,
          textAlign: "center",
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
            Stay Connected
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "#eeeeee" }}>
            Subscribe to our newsletter for exclusive offers, product updates,
            and styling tips.
          </Typography>

          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            <TextField
              fullWidth
              placeholder="Your Email Address"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              sx={{
                px: { xs: 3, sm: 6 },
                py: 1.5,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ContactPage;
