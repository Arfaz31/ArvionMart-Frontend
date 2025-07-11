import { Box } from "@mui/material";
import HeroSection from "./_component/Home/banner/HeroSection";
import PromoCard from "./_component/Home/PromoCard/PromoCard";
import Category from "./_component/Home/category/Category";
import BrandOffer from "./_component/Home/BrandOffer/BrandOffer";
import FeatureProduct from "./_component/Home/FeatureProduct/FeatureProduct";
import PromotionalBanner from "./_component/Home/PromotionalBanner/PromotionalBanner";
import NewArrivalProduct from "./_component/Home/NewArrival/NewArrivalProduct";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "#fafafa",
      }}
    >
      <HeroSection />
      <PromoCard />
      <Category />
      <BrandOffer />
      <FeatureProduct />
      <PromotionalBanner />
      <NewArrivalProduct />
    </Box>
  );
}
