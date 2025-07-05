import { Box } from "@mui/material";
import HeroSection from "./_component/Home/banner/HeroSection";
import HeroFromMobile from "./_component/Home/banner/Mobile/HeroFromMobile";
import Category from "./_component/Home/category/Category";
import HomeProduct from "./_component/Home/HomeProduct/HomeProduct";
import Gallery from "./_component/Home/gallery/Gellary";
import BestSellers from "./_component/Home/BestSeller/BestSeller";
import ProductPromotionPage from "./_component/Home/ProductPromotion/ProductPromotionPage";
import PromoBanner from "./_component/Home/Promobanner/Promobanner";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "#fafafa",
      }}
    >
      <HeroSection />
      <HeroFromMobile />
      <Category />
      <HomeProduct />
      <ProductPromotionPage />
      <BestSellers />
      <PromoBanner />
      <Gallery />
    </Box>
  );
}
