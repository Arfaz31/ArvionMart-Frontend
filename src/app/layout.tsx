import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Providers from "@/lib/Providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arvion Mart - Your One-Stop Online Shopping Destination",
  description:
    "Discover a wide range of products at Arvion Mart - from electronics, fashion, home goods to groceries. Enjoy competitive prices, fast delivery, and excellent customer service on all your purchases.",
  keywords: [
    "online shopping",
    "ecommerce",
    "buy electronics",
    "fashion store",
    "home appliances",
    "groceries online",
    "best deals",
    "discount shopping",
  ],
  openGraph: {
    title: "Arvion Mart - Shop Everything Online",
    description:
      "Your complete online marketplace with millions of products across all categories",
    url: "https://www.arvionmart.com",
    siteName: "Arvion Mart",
    images: [
      {
        url: "https://www.arvionmart.com/images/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Arvion Mart Online Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arvion Mart - Shop Everything Online",
    description:
      "Your complete online marketplace with millions of products across all categories",
    images: ["https://www.arvionmart.com/images/twitter-card.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
