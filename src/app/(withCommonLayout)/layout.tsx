import { Box } from "@mui/material";
import Footer from "./_component/Shared/Footer/Footer";
import Navbar from "./_component/Shared/Navbar/Navbar";
import MobileNavbar from "./_component/Shared/Navbar/Mobile/MobileNavbar";
import SearchBar from "./_component/Shared/Navbar/Mobile/SearchBar";
import FloatingCart from "./_component/FloatingCart/page";
import FloatingComponent from "./_component/cartDrawer/FloatingComponent";

// Sample cart items
const sampleItems = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    quantity: 1,
    image: "/images/headphones.jpg"
  },
  {
    id: 2,
    name: "Wireless Mouse",
    price: 49.99,
    quantity: 2,
    image: "/images/mouse.jpg"
  }
];

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: {
            lg: "none",
            xs: "block",
            sm: "none",
          },
        }}
      >
        <SearchBar />
      </Box>
      {children}
      <FloatingComponent/>
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
      <Box
        sx={{
          display: {
            lg: "none",
            xs: "block",
            sm: "none",
          },
        }}
      >
        <MobileNavbar />
      
      </Box>
    </div>
  );
};

export default layout;
