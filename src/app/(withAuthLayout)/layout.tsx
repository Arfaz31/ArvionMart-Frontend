import Providers from "@/lib/Providers/Providers";
import { Container } from "@mui/material";
import React from "react";
import { Toaster } from "sonner";
export default function WithDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Providers>
        <Container>{children}</Container>
        <Toaster richColors position="top-center" />
      </Providers>
    </div>
  );
}
