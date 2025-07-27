import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RestaurantGrid from "@/components/RestaurantGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <RestaurantGrid />
    </div>
  );
};

export default Index;
