import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-senegal-cuisine.jpg";
const HeroSection = () => {
  const navigate = useNavigate();
  return <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Cuisine sénégalaise" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-terracotta/80 via-spice/60 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-slide-up">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
          Découvrez les{" "}
          <span className="text-sahel">meilleurs restaurants</span>{" "}
          du Sénégal
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          Trouvez les plats du jour de vos restaurants préférés à Dakar et partout au Sénégal
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <Input placeholder="Restaurant, quartier..." className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30" />
            </div>
            
            <div className="relative sm:w-48">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <Input placeholder="Dakar" className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30" />
            </div>
            
            <Button variant="spice" size="lg" className="sm:w-auto" onClick={() => navigate('/search')}>
              Rechercher
            </Button>
          </div>
        </div>
        
        {/* Quick Stats */}
        
      </div>
    </section>;
};
export default HeroSection;