import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Star, ChefHat, TrendingUp } from "lucide-react";

// Mock data pour les menus du jour mis en avant
const featuredMenus = [
  {
    id: "1",
    restaurantName: "Chez Fatou",
    restaurantId: "1",
    dish: {
      name: "Thiéboudienne Rouge",
      description: "Le plat national sénégalais avec poisson frais, légumes variés et riz parfumé",
      price: 3500,
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 89
    },
    badge: "Plat du jour",
    trending: true
  },
  {
    id: "2", 
    restaurantName: "Restaurant Teranga",
    restaurantId: "2",
    dish: {
      name: "Mafé Bœuf Premium",
      description: "Bœuf tendre mijoté dans une sauce d'arachide crémeuse, accompagné de légumes de saison",
      price: 4000,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 56
    },
    badge: "Spécialité",
    trending: false
  },
  {
    id: "3",
    restaurantName: "Le Baobab Gourmand", 
    restaurantId: "3",
    dish: {
      name: "Caldou aux Légumes",
      description: "Ragoût traditionnel aux légumes frais du marché et épices locales",
      price: 2500,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 34
    },
    badge: "Végétarien",
    trending: true
  }
];

const FeaturedMenus = () => {
  const navigate = useNavigate();

  const handleDishClick = (restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="w-8 h-8 text-spice mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Menus du Jour
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez les plats les plus populaires d'aujourd'hui, préparés avec passion par nos chefs
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-spice to-sahel mx-auto mt-6 rounded-full" />
        </div>

        {/* Featured Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredMenus.map((menu, index) => (
            <Card 
              key={menu.id} 
              className="group overflow-hidden hover:shadow-warm transition-all duration-300 hover:scale-[1.02] cursor-pointer border-muted/50 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => handleDishClick(menu.restaurantId)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={menu.dish.image} 
                  alt={menu.dish.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge 
                    className={`backdrop-blur-sm ${
                      menu.badge === "Plat du jour" 
                        ? "bg-baobab/90 text-white" 
                        : menu.badge === "Spécialité"
                        ? "bg-spice/90 text-white"
                        : "bg-sahel/90 text-white"
                    }`}
                  >
                    {menu.badge}
                  </Badge>
                  {menu.trending && (
                    <Badge className="bg-terracotta/90 text-white backdrop-blur-sm flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Tendance
                    </Badge>
                  )}
                </div>

                {/* Price badge */}
                <Badge className="absolute top-4 right-4 bg-black/80 text-white backdrop-blur-sm font-bold">
                  {menu.dish.price.toLocaleString()} CFA
                </Badge>

                {/* Restaurant name */}
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm opacity-90">{menu.restaurantName}</p>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-spice transition-colors">
                  {menu.dish.name}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                  {menu.dish.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-sahel text-sahel" />
                    <span className="font-medium text-sm">{menu.dish.rating}</span>
                    <span className="text-xs text-muted-foreground">({menu.dish.reviewCount} avis)</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Disponible aujourd'hui</span>
                  </div>
                </div>

                <Button 
                  variant="spice" 
                  className="w-full hover:shadow-lg transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDishClick(menu.restaurantId);
                  }}
                >
                  Découvrir le restaurant
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in">
          <Button 
            variant="sahel" 
            size="lg" 
            className="hover:shadow-lg transition-all duration-200"
            onClick={() => navigate('/search')}
          >
            Voir tous les menus du jour
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenus;