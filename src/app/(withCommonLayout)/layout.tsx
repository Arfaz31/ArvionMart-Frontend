import { Box } from "@mui/material";
import Footer from "./_component/Shared/Footer/Footer";
import Navbar from "./_component/Shared/Navbar/Navbar";
import MobileNavbar from "./_component/Shared/Navbar/Mobile/MobileNavbar";
import FloatingCart from "./_component/FloatingCart/page";
import FloatingComponent from "./_component/cartDrawer/FloatingComponent";
import { getServerSession } from "next-auth";

import { CustomSession } from "@/types/session.type";
import { authOptions } from "@/utils/authOptions";

// Sample cart items
const sampleItems = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    quantity: 1,
    image: "/images/headphones.jpg",
  },
  {
    id: 2,
    name: "Wireless Mouse",
    price: 49.99,
    quantity: 2,
    image: "/images/mouse.jpg",
  },
];

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as CustomSession | null;
  return (
    <div>
      <Navbar session={session} />
      {children}
      <FloatingComponent />
      <FloatingCart initialItems={sampleItems} />
      <Box
        sx={{
          display: {
            lg: "block",
            xs: "none",
            sm: "block",
          },
        }}
      >
        <Footer />
      </Box>
      <MobileNavbar />
    </div>
  );
}
