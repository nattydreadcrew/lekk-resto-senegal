import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedMenus from "@/components/FeaturedMenus";
import CategoryFilter from "@/components/CategoryFilter";
import RestaurantGrid from "@/components/RestaurantGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedMenus />
      <CategoryFilter />
      <RestaurantGrid />
      <Footer />
    </div>
  );
};

export default Index;
