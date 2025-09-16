import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, ChefHat, Truck } from "lucide-react";

// Mock data pour les menus du jour mis en avant
const featuredRestaurants = [
  {
    id: "1",
    name: "Le Bambaly",
    address: "Route de Yoff, Jardin Cité BCEAO",
    phone: "+221 77 123 45 67",
    deliveryAvailable: true,
    logo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80&h=80&fit=crop&crop=center",
    dishes: [
      {
        name: "Soupou Kandia",
        price: 3500,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop"
      },
      {
        name: "Pain jordanien fraîchement préparé",
        price: 6000,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop"
      }
    ]
  },
  {
    id: "2",
    name: "LA SOLUTION",
    address: "Fass Paillote, Dakar, Senegal", 
    phone: "+221 78 234 56 78",
    deliveryAvailable: false,
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=center",
    dishes: [
      {
        name: "Attieké poisson",
        price: 4500,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop"
      },
      {
        name: "AMIWO (pâte rouge)",
        price: 3000,
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop"
      }
    ]
  },
  {
    id: "3", 
    name: "Chez Fatou",
    address: "Medina, Dakar, Senegal",
    phone: "+221 76 345 67 89",
    deliveryAvailable: true,
    logo: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=80&h=80&fit=crop&crop=center",
    dishes: [
      {
        name: "Thiéboudienne Rouge",
        price: 4000,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop"
      },
      {
        name: "Mafé Bœuf Premium", 
        price: 5000,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop"
      }
    ]
  }
];

const FeaturedMenus = () => {
  const navigate = useNavigate();

  const handleRestaurantClick = (restaurantId: string) => {
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

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {featuredRestaurants.map((restaurant, index) => (
            <Card 
              key={restaurant.id} 
              className="group overflow-hidden hover:shadow-warm transition-all duration-300 cursor-pointer border-muted/50 animate-fade-in bg-card"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => handleRestaurantClick(restaurant.id)}
            >
              <CardContent className="p-6">
                {/* Restaurant Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={restaurant.logo} 
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-spice transition-colors">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="line-clamp-1">{restaurant.address}</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <Badge 
                          variant={restaurant.deliveryAvailable ? "default" : "secondary"}
                          className={`text-xs ${restaurant.deliveryAvailable ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}
                        >
                          <Truck className="w-3 h-3 mr-1" />
                          {restaurant.deliveryAvailable ? "Livraison disponible" : "Pas de livraison"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full w-10 h-10 p-0 hover:bg-spice hover:text-white border-spice/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`tel:${restaurant.phone}`, '_self');
                    }}
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>

                {/* Dishes Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {restaurant.dishes.map((dish, dishIndex) => (
                    <div 
                      key={dishIndex}
                      className="relative overflow-hidden rounded-lg group/dish"
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-lg">
                        <img 
                          src={dish.image} 
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover/dish:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Dish Details */}
                      <div className="mt-3">
                        <h4 className="font-semibold text-sm text-foreground line-clamp-2 leading-tight">
                          {dish.name}
                        </h4>
                        <p className="text-spice font-bold text-lg mt-1">
                          {dish.price.toLocaleString()} <span className="text-sm font-normal">CFA</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in">
          <Button 
            variant="default" 
            size="lg" 
            className="bg-gradient-to-r from-spice to-sahel hover:shadow-lg transition-all duration-200 text-white"
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