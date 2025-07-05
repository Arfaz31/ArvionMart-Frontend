"use client";

import {
  Box,
  Typography,
  Container,
  Breadcrumbs,
  Link,
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
import {
  NavigateNext,
  Security,
  Info,
  Policy,
  Cookie,
  Gavel,
  ContactSupport,
  ExpandMore,
} from "@mui/icons-material";
import { useState } from "react";

const PrivacyPolicyPage = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // List of policy sections
  const policySections = [
    {
      id: "panel1",
      title: "Information We Collect",
      icon: <Info />,
      content: `
        <p>PrimeShoes collects several types of information from and about users of our Website, including:</p>
        <ul>
          <li>Personal information you provide to us when you create an account, make a purchase, or contact us, such as your name, postal address, email address, telephone number, and payment information.</li>
          <li>Information about your internet connection, the equipment you use to access our Website, and usage details.</li>
          <li>Non-personal information such as browser type, language preference, referring site, and the date and time of each visitor request.</li>
        </ul>
        <p>We collect this information:</p>
        <ul>
          <li>Directly from you when you provide it to us.</li>
          <li>Automatically as you navigate through the site, including through cookies and other tracking technologies.</li>
          <li>From third parties, such as our business partners.</li>
        </ul>
      `,
    },
    {
      id: "panel2",
      title: "How We Use Your Information",
      icon: <Security />,
      content: `
        <p>We use the information we collect about you or that you provide to us:</p>
        <ul>
          <li>To present our Website and its contents to you.</li>
          <li>To process and fulfill your orders and provide customer service.</li>
          <li>To send you marketing and promotional communications (you can opt-out at any time).</li>
          <li>To personalize your experience and deliver content and product offerings relevant to your interests.</li>
          <li>To improve our Website, products, services, and customer experience.</li>
          <li>To protect the security and integrity of our Website and business.</li>
          <li>To comply with legal obligations.</li>
        </ul>
      `,
    },
    {
      id: "panel3",
      title: "Cookies & Tracking Technologies",
      icon: <Cookie />,
      content: `
        <p>We use cookies and similar tracking technologies to track activity on our Website and hold certain information.</p>
        <p>Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device.</p>
        <p>We use the following types of cookies:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly.</li>
          <li><strong>Preference Cookies:</strong> These cookies remember your preferences and settings.</li>
          <li><strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website.</li>
          <li><strong>Marketing Cookies:</strong> These cookies track your online activity to help deliver targeted advertising.</li>
        </ul>
        <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Website.</p>
      `,
    },
    {
      id: "panel4",
      title: "Data Sharing & Third Parties",
      icon: <Policy />,
      content: `
        <p>We may share your personal information with:</p>
        <ul>
          <li>Our subsidiaries and affiliates.</li>
          <li>Service providers we use to support our business.</li>
          <li>Marketing partners with whom we have joint marketing agreements.</li>
          <li>A buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets.</li>
        </ul>
        <p>We may also disclose your personal information:</p>
        <ul>
          <li>To comply with any court order, law, or legal process.</li>
          <li>To enforce or apply our terms of use or terms of sale.</li>
          <li>If we believe disclosure is necessary to protect the rights, property, or safety of PrimeShoes, our customers, or others.</li>
        </ul>
        <p>We do not sell, rent, or lease customer lists to third parties.</p>
      `,
    },
    {
      id: "panel5",
      title: "Your Privacy Rights",
      icon: <Gavel />,
      content: `
        <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
        <ul>
          <li>Access to your personal information.</li>
          <li>Correction of inaccurate or incomplete information.</li>
          <li>Deletion of your personal information.</li>
          <li>Restriction or objection to processing of your personal information.</li>
          <li>Data portability.</li>
          <li>Withdrawal of consent.</li>
        </ul>
        <p>To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below.</p>
        <p>For California residents, please see our California Privacy Rights section below for additional information about your rights under the California Consumer Privacy Act (CCPA).</p>
      `,
    },
    {
      id: "panel6",
      title: "Contact Us",
      icon: <ContactSupport />,
      content: `
        <p>If you have any questions or concerns about our Privacy Policy or our data practices, please contact us at:</p>
        <p>
          PrimeShoes<br />
          123 Fashion Avenue<br />
          New York, NY 10001<br />
          Email: privacy@primeshoes.com<br />
          Phone: +1 (800) 123-4567
        </p>
        <p>Our Data Protection Officer can be contacted at dpo@primeshoes.com.</p>
      `,
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
            Privacy Policy
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
            <Typography color="white">Privacy Policy</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="body1" paragraph>
            Last Updated: April 15, 2025
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            At PrimeShoes, we respect your privacy and are committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you visit our website, use our mobile application, or make a
            purchase. Please read this policy carefully to understand our
            practices regarding your personal data.
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Table of Contents */}
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Table of Contents
          </Typography>
          <List sx={{ mb: 6 }}>
            {policySections.map((section) => (
              <ListItem
                key={section.id}
                component="a"
                href={`#${section.id}`}
                sx={{
                  pl: 0,
                  py: 1.5,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {section.icon}
                </ListItemIcon>
                <ListItemText primary={section.title} />
              </ListItem>
            ))}
          </List>

          {/* Policy Content */}
          {policySections.map((section) => (
            <Accordion
              key={section.id}
              expanded={expanded === section.id}
              onChange={handleChange(section.id)}
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
                aria-controls={`${section.id}-content`}
                id={`${section.id}-header`}
                sx={{
                  backgroundColor: theme.palette.grey[50],
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      color: theme.palette.primary.main,
                    }}
                  >
                    {section.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {section.title}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 3 }}>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </AccordionDetails>
            </Accordion>
          ))}

          <Divider sx={{ my: 6 }} />

          {/* Additional Sections */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Changes to Our Privacy Policy
            </Typography>
            <Typography variant="body1">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &quot;Last Updated&quot; date at the top of this
              page.
            </Typography>
            <Typography variant="body1">
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              California Privacy Rights
            </Typography>
            <Typography variant="body1" paragraph>
              If you are a California resident, you have specific rights
              regarding your personal information under the California Consumer
              Privacy Act (CCPA). This section describes your CCPA rights and
              explains how to exercise those rights.
            </Typography>
            <Typography variant="body1" paragraph>
              You have the right to request that we disclose certain information
              to you about our collection and use of your personal information
              over the past 12 months. You also have the right to request that
              we delete any of your personal information that we collected from
              you and retained, subject to certain exceptions.
            </Typography>
            <Typography variant="body1">
              To exercise the rights described above, please submit a verifiable
              consumer request to us by contacting us using the information
              provided in the &quot;Contact Us&quot; section.
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Children&apos;s Privacy
            </Typography>
            <Typography variant="body1">
              Our Website is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children under
              13. If you are a parent or guardian and you are aware that your
              child has provided us with personal information, please contact us
              so that we can take necessary actions.
            </Typography>
          </Box>

          {/* Final CTA */}
          <Box
            sx={{
              mt: 6,
              p: 4,
              backgroundColor: theme.palette.grey[50],
              borderRadius: 2,
              textAlign: "center",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Have Questions About Our Privacy Practices?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Our customer support team is here to help you understand how we
              protect your information.
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
              Contact Us
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicyPage;
