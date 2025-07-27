import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RestaurantCard from "@/components/RestaurantCard";
import { Heart, ArrowLeft } from "lucide-react";

// Mock restaurants data - même que dans RestaurantGrid
const mockRestaurants = [
  {
    id: "1",
    name: "Chez Fatou",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=300&fit=crop",
    address: "Plateau, Dakar",
    phone: "+221 77 123 45 67",
    rating: 4.8,
    deliveryAvailable: true,
    openNow: true,
    todaySpecials: [
      { name: "Thiéboudienne", price: 3500 },
      { name: "Yassa Poulet", price: 2800 }
    ]
  },
  {
    id: "2", 
    name: "Restaurant Teranga",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
    address: "Almadies, Dakar",
    phone: "+221 78 987 65 43",
    rating: 4.6,
    deliveryAvailable: true,
    openNow: true,
    todaySpecials: [
      { name: "Mafé Bœuf", price: 4000 },
      { name: "Poisson Braisé", price: 3200 }
    ]
  },
  {
    id: "3",
    name: "Le Baobab Gourmand", 
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&h=300&fit=crop",
    address: "Medina, Dakar",
    phone: "+221 76 555 44 33",
    rating: 4.4,
    deliveryAvailable: false,
    openNow: true,
    todaySpecials: [
      { name: "Caldou", price: 2500 },
      { name: "Domoda", price: 2200 }
    ]
  }
];

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<typeof mockRestaurants>([]);

  useEffect(() => {
    // Charger les favoris depuis localStorage
    const favorites = JSON.parse(localStorage.getItem('lekk-resto-favorites') || '[]');
    setFavoriteIds(favorites);
    
    // Filtrer les restaurants favoris
    const favRestaurants = mockRestaurants.filter(restaurant => 
      favorites.includes(restaurant.id)
    );
    setFavoriteRestaurants(favRestaurants);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-xl font-display font-semibold text-foreground">
                Mes restaurants favoris
              </h1>
              <p className="text-sm text-muted-foreground">
                {favoriteRestaurants.length} restaurant{favoriteRestaurants.length > 1 ? 's' : ''} favori{favoriteRestaurants.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {favoriteRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteRestaurants.map((restaurant, index) => (
              <div key={restaurant.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">
              <Heart className="w-24 h-24 mx-auto text-muted-foreground/30" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Aucun restaurant favori
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Ajoutez des restaurants à vos favoris en cliquant sur le cœur pour les retrouver facilement ici.
            </p>
            <Button 
              variant="spice" 
              onClick={() => navigate('/search')}
              className="px-8"
            >
              Découvrir des restaurants
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;