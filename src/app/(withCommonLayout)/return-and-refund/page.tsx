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
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Button,
} from "@mui/material";

// Import Timeline components from @mui/lab instead of @mui/material
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

import {
  NavigateNext,
  AssignmentReturn,
  AttachMoney,
  LocalShipping,
  CheckCircle,
  Info,
  ExpandMore,
  Warning,
  ThumbUp,
  CheckBox,
  Cancel,
  Help,
} from "@mui/icons-material";
import { useState } from "react";

const ReturnAndRefund = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // Return Eligibility
  const eligibleItems = [
    "Unworn shoes in original condition",
    "Shoes with original box and packaging intact",
    "Items returned within 30 days of delivery",
    "Items with original tags attached",
    "Clothes with tags still attached",
    "Accessories in original packaging",
  ];

  const nonEligibleItems = [
    "Shoes showing signs of wear or damage",
    "Items without original packaging",
    "Final sale or clearance items (marked as such)",
    "Personalized or custom-made products",
    "Gift cards and digital downloads",
    "Items returned after 30 days",
  ];

  // Return Process Steps
  const returnSteps = [
    {
      label: "Initiate Return",
      description:
        "Log into your account, find your order, and select the items you wish to return. Fill out the return reason form and submit your request.",
    },
    {
      label: "Return Approval",
      description:
        "Our team will review your return request. Once approved, you'll receive a confirmation email with return instructions and a prepaid shipping label (if eligible).",
    },
    {
      label: "Package Your Return",
      description:
        "Place the items in their original packaging, attach the return label to the outside of the package, and seal securely. Include the return form inside the package.",
    },
    {
      label: "Ship Your Return",
      description:
        "Drop off your package at the designated carrier location. We recommend keeping your tracking number for reference until the return is complete.",
    },
    {
      label: "Return Processing",
      description:
        "Once we receive your return, our team will inspect the items to ensure they meet our return policy requirements. This typically takes 2-3 business days.",
    },
    {
      label: "Refund Issued",
      description:
        "After your return is approved, we'll process your refund to the original payment method. Please allow 5-10 business days for the refund to appear in your account.",
    },
  ];

  // FAQ questions and answers
  const faqs = [
    {
      id: "panel1",
      question: "How long do I have to return an item?",
      answer:
        "You have 30 days from the delivery date to return most items. The return request must be initiated within this period. For seasonal or limited-edition items, the return window may be shorter and will be specified on the product page at the time of purchase.",
    },
    {
      id: "panel2",
      question: "Do I have to pay for return shipping?",
      answer:
        "For standard returns, customers are responsible for return shipping costs unless the return is due to a PrimeShoes error (wrong item shipped, defective product, etc.). Premium and VIP members receive free return shipping on all orders. Prepaid return labels are provided for exchanges at no additional cost.",
    },
    {
      id: "panel3",
      question: "How long does it take to receive my refund?",
      answer:
        "After we receive and inspect your return, the refund is processed within 2-3 business days. Once processed, it typically takes 5-7 business days for the refund to appear in your account, depending on your payment provider. Credit card refunds may take 1-2 billing cycles to appear on your statement.",
    },
    {
      id: "panel4",
      question: "Can I exchange an item instead of returning it?",
      answer:
        "Yes, we offer exchanges for items in different sizes or colors. To request an exchange, follow the same return process but select 'Exchange' instead of 'Return' and specify the replacement item you want. Exchanges are subject to availability. If the exchange item is not available, we'll process a refund instead.",
    },
    {
      id: "panel5",
      question: "What if my item arrives damaged or defective?",
      answer:
        "If you receive a damaged or defective item, please contact our customer service team within 48 hours of delivery. Include your order number and photos of the damaged items. We'll provide instructions for returning the item at no cost to you and will ship a replacement or process a full refund including original shipping charges.",
    },
    {
      id: "panel6",
      question: "Do you offer free returns?",
      answer:
        "Free returns are available for PrimeShoes members on orders over $100, and for all customers when the return is due to our error (wrong item shipped, defective product, etc.). Premium members enjoy free returns on all orders regardless of value. For standard returns, a shipping fee of $7.95 will be deducted from your refund amount unless you use our in-store return option.",
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
            Returns & Refunds
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
            <Typography color="white">Returns & Refunds</Typography>
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
                Our Return Policy
              </Typography>
              <Typography variant="body1">
                At PrimeShoes, we want you to be completely satisfied with your
                purchase. If you&apos;re not entirely happy with your order,
                we&apos;re here to help you return or exchange your items.
              </Typography>
              <Typography variant="body1">
                We offer a 30-day return policy for most items in new, unworn
                condition with original packaging and tags. Some exceptions
                apply, as detailed below.
              </Typography>
              <Typography variant="body1">
                This policy was last updated on March 15, 2025 and applies to
                all purchases made on or after this date.
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
                <AssignmentReturn sx={{ fontSize: 100 }} />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Return Policy Highlights */}
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
            Return your items within 30 days of delivery for a full refund or
            exchange!
          </Typography>
        </Box>

        {/* Return Eligibility */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700, mb: 3, mt: 6 }}
        >
          Return Eligibility
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                backgroundColor: theme.palette.success.main,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CheckCircle
                    fontSize="large"
                    sx={{ color: "white", mr: 2 }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: "white" }}
                  >
                    Eligible for Return
                  </Typography>
                </Box>
                <Divider
                  sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.3)" }}
                />
                <List>
                  {eligibleItems.map((item, index) => (
                    <ListItem key={index} sx={{ py: 1 }}>
                      <ListItemIcon>
                        <CheckBox sx={{ color: "white" }} />{" "}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography sx={{ color: "white" }}>
                            {item}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
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
                backgroundColor: theme.palette.error.main,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Warning fontSize="large" sx={{ color: "white", mr: 2 }} />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: "white" }}
                  >
                    Not Eligible for Return
                  </Typography>
                </Box>
                <Divider
                  sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.3)" }}
                />
                <List>
                  {nonEligibleItems.map((item, index) => (
                    <ListItem key={index} sx={{ py: 1 }}>
                      <ListItemIcon>
                        <Cancel sx={{ color: "white" }} />{" "}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography sx={{ color: "white" }}>
                            {item}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Return Process */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700, mb: 3, mt: 6 }}
        >
          Return Process
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            mb: 6,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Timeline position="alternate">
            {returnSteps.map((step, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  color="text.secondary"
                >
                  Step {index + 1}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {index < returnSteps.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{ fontWeight: 600 }}
                  >
                    {step.label}
                  </Typography>
                  <Typography variant="body2">{step.description}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              href="/account/returns"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Start a Return
            </Button>
          </Box>
        </Paper>

        {/* Refund Information */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700, mb: 3, mt: 6 }}
        >
          Refund Information
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
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
                  <AttachMoney
                    fontSize="large"
                    sx={{ color: theme.palette.primary.main, mr: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Refund Methods
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" paragraph>
                  Refunds are issued to the original payment method used for the
                  purchase:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Credit/Debit Cards: 5-10 business days" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="PayPal: 3-5 business days" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Store Credit: Immediately available" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Gift Cards: Non-refundable, store credit issued" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
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
                  <LocalShipping
                    fontSize="large"
                    sx={{ color: theme.palette.primary.main, mr: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Shipping Costs
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" paragraph>
                  Our policy on shipping costs for returns:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Original shipping charges are non-refundable" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Return shipping costs are paid by customer" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Free return shipping for defective items" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Free return shipping for Premium members" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
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
                  <Info
                    fontSize="large"
                    sx={{ color: theme.palette.primary.main, mr: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Special Circumstances
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" paragraph>
                  Additional policy details:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Damaged items: Full refund including shipping" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Incorrect items: Full refund including shipping" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Sale items: Regular return policy applies" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Gift returns: Refunded as store credit" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* In-Store Returns */}
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
            <ThumbUp
              fontSize="large"
              sx={{ color: theme.palette.primary.main, mr: 2 }}
            />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              In-Store Returns
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            For your convenience, online purchases can be returned to any
            PrimeShoes retail location within 30 days of purchase. Simply bring
            the items in their original condition along with your order
            confirmation or receipt.
          </Typography>
          <Typography variant="body1" paragraph>
            In-store returns are processed immediately, and refunds will be
            issued to your original payment method. Please note that some
            exclusions may apply for special collection or limited edition
            items.
          </Typography>
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="outlined"
              size="large"
              href="/store-locator"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Find a Store
            </Button>
          </Box>
        </Paper>

        {/* International Returns */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700, mb: 3, mt: 6 }}
        >
          International Returns
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 6,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="body1" paragraph>
            For international orders, our standard 30-day return policy applies,
            but please note the following:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="International customers are responsible for return shipping costs unless the return is due to a PrimeShoes error."
                secondary="We recommend using a trackable shipping method."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Import duties and taxes paid on the original order are typically non-refundable."
                secondary="These charges are levied by your country's customs agency, not PrimeShoes."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Return processing for international orders may take longer than domestic returns."
                secondary="Please allow up to 3 weeks from the time we receive your return for the refund to be processed."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="To initiate an international return, please contact our International Customer Service team."
                secondary="Email: international@primeshoes.com"
              />
            </ListItem>
          </List>
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
            Need Help with a Return or Refund?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Our customer service team is available 7 days a week to assist with
            any questions about returns or refunds.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid>
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
            </Grid>
            <Grid>
              <Button
                variant="outlined"
                size="large"
                startIcon={<Help />}
                href="/faq"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                View All FAQs
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ReturnAndRefund;
