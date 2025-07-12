"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNextRouter } from "./_component/useNextRouter";
import { dashboardTheme } from "./_component/theme";
import { NAVIGATION } from "./_component/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useNextRouter();

  return (
    <ThemeProvider theme={dashboardTheme}>
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo: (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit", // Ensure link doesn't have default blue color
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, #1565c0 0%, #5648d6 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #0d47a1 0%, #4527a0 100%)",
                    boxShadow: "0 4px 12px rgba(86, 72, 214, 0.3)",
                  },
                  color: "white",
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  mr: 1,
                }}
              >
                <ShoppingBagOutlinedIcon />
              </Box>
              <Box
                component="span"
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                ArvionMart
              </Box>
            </Box>
          ),
          title: "",
          homeUrl: "/admin",
        }}
        router={router}
        theme={dashboardTheme}
      >
        <CssBaseline />
        <DashboardLayout>
          <Box
            sx={{
              py: 4,
              px: 3,
              width: "100%",
            }}
          >
            {children}
          </Box>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
};

export default AdminLayout;
