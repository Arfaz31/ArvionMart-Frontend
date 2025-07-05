"use client";

import {
  Box,
  Typography,
  Container,
  Breadcrumbs,
  Link,
  Grid,
  Card,
  CardContent,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Button,
} from "@mui/material";
import {
  NavigateNext,
  Gavel,
  VerifiedUser,
  Security,
  Payment,
  ShoppingBag,
  ExpandMore,
  CreditCard,
  Lock,
  Policy,
} from "@mui/icons-material";
import { useState } from "react";

const TermsOfService = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // Terms sections with details
  const termsSections = [
    {
      id: "agreement",
      title: "Agreement to Terms",
      content:
        "By accessing or using PrimeShoes services, including our website, mobile applications, and any related services (collectively, the 'Services'), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, you may not access or use our Services. These Terms of Service apply to all visitors, users, and others who access or use the Services.",
    },
    {
      id: "accounts",
      title: "User Accounts",
      content:
        "When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account. You are responsible for safeguarding the password you use to access the Services and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.",
    },
    {
      id: "purchases",
      title: "Purchases and Payment",
      content:
        "PrimeShoes offers products for purchase through the Services. All purchases are subject to product availability. We reserve the right to modify, discontinue, or cancel any product or service at any time. Prices for our products are subject to change without notice. We reserve the right to refuse any order placed through the Services. All payments must be made through our approved payment methods. By providing payment information, you represent and warrant that you have the legal right to use any payment method(s) used in connection with any purchase.",
    },
    {
      id: "returns",
      title: "Returns and Refunds",
      content:
        "Products may be returned within 30 days of receipt if they are in new, unworn condition with all original packaging and tags attached. Certain items, including final sale items and personalized products, cannot be returned. Refunds will be issued to the original form of payment. Shipping and handling fees are non-refundable except in cases where products are defective or shipped incorrectly.",
    },
    {
      id: "intellectual",
      title: "Intellectual Property",
      content:
        "The Services and their original content, features, and functionality are and will remain the exclusive property of PrimeShoes and its licensors. The Services are protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of PrimeShoes. All product names, logos, and brands are property of their respective owners.",
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      content:
        "Your use of our Services is also governed by our Privacy Policy, which is incorporated into these Terms of Service by reference. Please review our Privacy Policy, which explains how we collect, use, and share information about you when you access or use our Services.",
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      content:
        "In no event shall PrimeShoes, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services, or any conduct or content of any third party on the Services.",
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      content:
        "Your use of the Services is at your sole risk. The Services are provided on an 'AS IS' and 'AS AVAILABLE' basis. PrimeShoes expressly disclaims all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We make no warranty that the Services will meet your requirements, be available on an uninterrupted, timely, secure, or error-free basis, or be accurate, reliable, or free of viruses or other harmful code.",
    },
  ];

  // FAQ questions and answers
  const faqs = [
    {
      id: "panel1",
      question: "How do I change my account information?",
      answer:
        "You can update your account information by logging into your PrimeShoes account and navigating to the 'Account Settings' section. Here, you can modify your personal information, change your password, update your shipping addresses, and manage your payment methods. If you encounter any issues, please contact our customer support team for assistance.",
    },
    {
      id: "panel2",
      question: "Can I cancel my order?",
      answer:
        "Orders can be canceled only if they have not yet entered the processing stage. To request a cancellation, please contact our customer service team as soon as possible with your order number. If your order has already been processed, you may need to wait until you receive the item and then follow our return procedure.",
    },
    {
      id: "panel3",
      question: "What happens if the product I want is out of stock?",
      answer:
        "If a product is out of stock, you will not be able to add it to your cart. For some popular items, we offer a 'Notify Me' option where you can provide your email to be alerted when the item is back in stock. We do not charge for out-of-stock items and do not maintain a backorder system.",
    },
    {
      id: "panel4",
      question: "Do you offer price matching?",
      answer:
        "PrimeShoes does not currently offer price matching with other retailers. However, we strive to provide competitive pricing on all our products. If you notice a significant price difference, please let us know, and we'll take it into consideration for future pricing adjustments.",
    },
    {
      id: "panel5",
      question: "How can I resolve a dispute with PrimeShoes?",
      answer:
        "We aim to resolve all customer issues promptly and fairly. If you have a dispute regarding a purchase, please contact our customer service team with all relevant details including your order number and the nature of your concern. If the issue cannot be resolved through our customer service channels, these Terms of Service outline the dispute resolution process, including arbitration options available to both parties.",
    },
  ];

  return (
    <Box sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: "white",
          py: 6,
          width: "100%",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              [theme.breakpoints.down("sm")]: {
                fontSize: "2rem",
              },
            }}
          >
            Terms of Service
          </Typography>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ color: "rgba(255,255,255,0.7)" }}
          >
            <Link href="/" underline="hover" color="inherit">
              Home
            </Link>
            <Link href="/support" underline="hover" color="inherit">
              Support
            </Link>
            <Typography color="white">Terms of Service</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
        {/* Introduction */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            mb: 5,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                Our Terms and Conditions
              </Typography>
              <Typography variant="body1" paragraph>
                Welcome to PrimeShoes. These Terms of Service govern your use of
                our website, mobile applications, and services. By accessing or
                using PrimeShoes, you agree to be bound by these terms.
              </Typography>
              <Typography variant="body1" paragraph>
                Please read these terms carefully before using our platform. If
                you do not agree with any part of these terms, please do not use
                our services. These terms were last updated on April 1, 2025.
              </Typography>
              <Typography variant="body1">
                If you have any questions about these terms, please{" "}
                <Link href="/contact" underline="hover" color="primary">
                  contact our support team
                </Link>
                .
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  textAlign: "center",
                  color: theme.palette.primary.main,
                  p: 3,
                }}
              >
                <Gavel sx={{ fontSize: 100 }} />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Effective Date Notice */}
        <Box
          sx={{
            backgroundColor: theme.palette.primary.light,
            color: "white",
            p: 3,
            borderRadius: 2,
            mb: 6,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            These Terms of Service are effective as of April 1, 2025 and will
            remain in effect except with respect to any changes in its
            provisions in the future.
          </Typography>
        </Box>

        {/* Terms Sections */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700, mb: 4, mt: 6 }}
        >
          Terms and Conditions
        </Typography>

        {termsSections.map((section, index) => (
          <Paper
            key={section.id}
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              mb: 4,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor:
                index % 2 === 0 ? "white" : theme.palette.grey[50],
            }}
          >
            <Typography
              variant="h5"
              component="h3"
              sx={{ fontWeight: 600, mb: 2 }}
              id={section.id}
            >
              {section.title}
            </Typography>
            <Typography variant="body1">{section.content}</Typography>
          </Paper>
        ))}

        {/* User Guidelines */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700, mb: 3, mt: 6 }}
        >
          User Guidelines
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <VerifiedUser
                    fontSize="large"
                    sx={{ color: theme.palette.primary.main, mr: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Acceptable Use
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" paragraph>
                  You agree to use PrimeShoes only for lawful purposes and in
                  accordance with these Terms of Service. You agree not to:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Use the Services in any way that violates any applicable federal, state, local, or international law or regulation." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Services." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Attempt to gain unauthorized access to or impair any aspect of the Services or its related systems." />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Security
                    fontSize="large"
                    sx={{ color: theme.palette.primary.main, mr: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Account Security
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" paragraph>
                  You are responsible for safeguarding your account and for all
                  activities that occur under your account. To protect your
                  account, you should:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Use a strong, unique password and change it regularly." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Enable two-factor authentication when available." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Sign out of your account after using shared computers." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Contact us immediately if you suspect unauthorized access." />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Payment & Orders */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700, mb: 3, mt: 6 }}
        >
          Payments and Orders
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Payment
                    fontSize="large"
                    sx={{ color: theme.palette.primary.main, mr: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Payment Methods
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" paragraph>
                  We accept the following payment methods:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CreditCard fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Major credit cards (Visa, MasterCard, American Express, Discover)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CreditCard fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Debit cards" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CreditCard fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="PayPal" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CreditCard fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Shop Pay" />
                  </ListItem>
                </List>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  All transactions are processed securely. We do not store
                  complete payment information on our servers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <ShoppingBag
                    fontSize="large"
                    sx={{ color: theme.palette.primary.main, mr: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Order Processing
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" paragraph>
                  When you place an order through our Services:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="We will verify your payment information before processing your order." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="You will receive an order confirmation email with your order details." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Orders may be subject to verification checks to prevent fraud." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="We reserve the right to refuse or cancel orders at our discretion." />
                  </ListItem>
                </List>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  For more information about shipping and delivery, please refer
                  to our{" "}
                  <Link href="/shipping" underline="hover" color="primary">
                    Shipping & Delivery page
                  </Link>
                  .
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Privacy and Security */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 6,
            borderRadius: 2,
            backgroundColor: theme.palette.grey[50],
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Lock
              fontSize="large"
              sx={{ color: theme.palette.primary.main, mr: 2 }}
            />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Your Privacy and Security
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            We take your privacy and the security of your personal information
            seriously. All personal data is collected, stored, and processed in
            accordance with our Privacy Policy.
          </Typography>
          <Typography variant="body1" paragraph>
            We implement a variety of security measures to maintain the safety
            of your personal information, including using industry-standard
            encryption protocols and data storage practices.
          </Typography>
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Policy />}
              href="/privacy-policy"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              View Privacy Policy
            </Button>
          </Box>
        </Paper>

        {/* Frequently Asked Questions */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700, mb: 3, mt: 6 }}
        >
          Frequently Asked Questions
        </Typography>
        <Box sx={{ mb: 6 }}>
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              elevation={0}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                mb: 2,
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`${faq.id}-content`}
                id={`${faq.id}-header`}
              >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Contact Section */}
        <Box
          sx={{
            backgroundColor: theme.palette.grey[50],
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            border: `1px solid ${theme.palette.divider}`,
            mt: 6,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Have Questions About Our Terms?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Our customer service team is available to answer any questions you
            may have about our Terms of Service or other policies.
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/contact"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
            }}
          >
            Contact Support
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TermsOfService;
