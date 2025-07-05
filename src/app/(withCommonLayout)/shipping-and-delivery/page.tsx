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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Button,
} from "@mui/material";
import {
  NavigateNext,
  LocalShipping,
  FlightTakeoff,
  AccessTime,
  LocationOn,
  ExpandMore,
} from "@mui/icons-material";
import { useState } from "react";

const ShippingAndDeliveryPage = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // Shipping options with details
  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "3-5 business days",
      price: "$5.99",
      freeThreshold: "$75 and above",
    },
    {
      name: "Express Shipping",
      time: "2 business days",
      price: "$12.99",
      freeThreshold: "$150 and above",
    },
    {
      name: "Next Day Delivery",
      time: "Next business day",
      price: "$19.99",
      freeThreshold: "Not available",
    },
    {
      name: "International Standard",
      time: "7-14 business days",
      price: "$24.99",
      freeThreshold: "$200 and above",
    },
    {
      name: "International Express",
      time: "3-5 business days",
      price: "$39.99",
      freeThreshold: "Not available",
    },
  ];

  // FAQ questions and answers
  const faqs = [
    {
      id: "panel1",
      question: "How can I track my order?",
      answer:
        "You can track your order by logging into your PrimeShoes account and navigating to 'Order History'. Here, you'll find all your orders with their current status and tracking information. Alternatively, you can use the tracking number provided in your shipping confirmation email on our tracking page or directly on the carrier's website.",
    },
    {
      id: "panel2",
      question: "When will my order ship?",
      answer:
        "Orders are typically processed within 24 hours after payment confirmation. If you place your order before 2PM EST on a business day, it will likely ship the same day. Orders placed after 2PM EST or on weekends and holidays will be processed the next business day. You'll receive a shipping confirmation email with tracking information once your order ships.",
    },
    {
      id: "panel3",
      question: "Do you ship to PO boxes or APO/FPO addresses?",
      answer:
        "Yes, we ship to PO boxes and APO/FPO addresses using USPS. Please note that delivery times may be longer than usual for these addresses, and express shipping options are not available. For APO/FPO addresses, please allow 2-3 weeks for delivery due to military postal system processing times.",
    },
    {
      id: "panel4",
      question: "What countries do you ship to?",
      answer:
        "We currently ship to over 100 countries worldwide. During checkout, you can select your country to see available shipping options and costs. Some restrictions may apply due to customs regulations. Please note that international orders may be subject to import duties and taxes, which are the responsibility of the recipient.",
    },
    {
      id: "panel5",
      question: "What if my order arrives damaged or incorrect?",
      answer:
        "If your order arrives damaged or you received incorrect items, please contact our customer service team within 48 hours of delivery. Please take photos of the damaged items or packaging and include your order number when contacting us. We'll arrange for a replacement shipment or refund as appropriate.",
    },
  ];

  // Order Processing Steps
  const orderSteps = [
    {
      label: "Order Placed",
      description:
        "Your order is confirmed and payment is processed. You'll receive an order confirmation email with your order number.",
    },
    {
      label: "Order Processing",
      description:
        "Your order is being prepared in our warehouse. Items are picked, packed, and prepared for shipping.",
    },
    {
      label: "Order Shipped",
      description:
        "Your order has been handed over to the carrier. You'll receive a shipping confirmation email with tracking information.",
    },
    {
      label: "Order in Transit",
      description:
        "Your order is on its way to you. You can track its progress using the tracking number provided.",
    },
    {
      label: "Order Delivered",
      description:
        "Your order has been delivered to the shipping address provided. We hope you enjoy your new shoes!",
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
            Shipping & Delivery
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
            <Typography color="white">Shipping & Delivery</Typography>
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
                Fast & Reliable Delivery
              </Typography>
              <Typography variant="body1">
                At PrimeShoes, we understand that receiving your new shoes
                quickly is important. That&apos;s why we offer multiple shipping
                options to meet your needs, from standard delivery to express
                shipping for those must-have styles.
              </Typography>
              <Typography variant="body1">
                We partner with trusted carriers to ensure your purchase arrives
                safely and on time. Orders are processed promptly in our
                state-of-the-art fulfillment center, with most shipping the same
                business day when placed before 2PM EST.
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
                <LocalShipping sx={{ fontSize: 100 }} />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Shipping Options */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700, mb: 3, mt: 6 }}
        >
          Shipping Options
        </Typography>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            mb: 6,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: theme.palette.grey[50] }}>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  Shipping Method
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  Estimated Time
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  Cost
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  Free Shipping
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shippingOptions.map((option, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor:
                      index % 2 === 0 ? "white" : theme.palette.grey[50],
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ py: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {option.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ py: 2 }}>
                    {option.time}
                  </TableCell>
                  <TableCell align="center" sx={{ py: 2 }}>
                    {option.price}
                  </TableCell>
                  <TableCell align="center" sx={{ py: 2 }}>
                    {option.freeThreshold}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Free Shipping Reminder */}
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
            Enjoy FREE Standard Shipping on all domestic orders over $75!
          </Typography>
        </Box>

        {/* Order Process */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700, mb: 3, mt: 6 }}
        >
          Order Process
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
          <Stepper orientation="vertical" sx={{ mb: 4 }}>
            {orderSteps.map((step, index) => (
              <Step key={index} active={true}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {step.label}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body1" sx={{ mb: 2, ml: 1 }}>
                    {step.description}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Shipping Regions */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700, mb: 3, mt: 6 }}
        >
          Shipping Regions
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
                  <LocationOn
                    fontSize="large"
                    sx={{ color: theme.palette.primary.main, mr: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Domestic Shipping (United States)
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1">
                  We ship to all 50 states, including Alaska and Hawaii.
                  Standard shipping times apply to the continental US. Orders to
                  Alaska, Hawaii, and US territories may take an additional 2-3
                  business days.
                </Typography>
                <Typography variant="body1">
                  All domestic orders are shipped via USPS, UPS, or FedEx
                  depending on the shipping method selected and delivery
                  address.
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
                  <FlightTakeoff
                    fontSize="large"
                    sx={{ color: theme.palette.primary.main, mr: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    International Shipping
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1">
                  We ship to over 100 countries worldwide. International
                  shipping times vary by destination. Customs clearance may add
                  additional time to delivery estimates.
                </Typography>
                <Typography variant="body1">
                  Please note that import duties, taxes, and customs fees are
                  not included in the product price or shipping cost. These
                  charges are the buyer&apos;s responsibility.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Holiday Shipping */}
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
            <AccessTime
              fontSize="large"
              sx={{ color: theme.palette.primary.main, mr: 2 }}
            />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Holiday Shipping Schedule
            </Typography>
          </Box>
          <Typography variant="body1">
            Please note that shipping times may be extended during peak holiday
            seasons (Thanksgiving through New Year&apos;s). For guaranteed
            delivery before specific holidays, please check our holiday shipping
            schedule which will be posted on our website in October.
          </Typography>
          <Typography variant="body1">
            We recommend placing holiday orders early to ensure timely delivery.
            Express and Next Day shipping options are subject to carrier
            availability and may be limited during peak seasons.
          </Typography>
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

        {/* Need Help Section */}
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
            Need Help with Shipping or Delivery?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Our customer service team is available Monday through Friday, 9AM to
            6PM EST to assist with any shipping or delivery questions.
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

export default ShippingAndDeliveryPage;
