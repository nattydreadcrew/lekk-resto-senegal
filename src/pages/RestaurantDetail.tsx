import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Star, MapPin, Phone, Clock, Truck, Euro } from "lucide-react";

// Mock restaurant data - sera remplacé par Supabase
const mockRestaurantDetail = {
  id: "1",
  name: "Chez Fatou",
  image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop"
  ],
  address: "Plateau, Avenue Léopold Sédar Senghor, Dakar",
  phone: "+221 77 123 45 67",
  rating: 4.8,
  reviewCount: 127,
  deliveryAvailable: true,
  deliveryFee: 1000,
  deliveryTime: "30-45 min",
  openNow: true,
  openingHours: "11:00 - 22:00",
  description: "Restaurant traditionnel sénégalais offrant une cuisine authentique dans un cadre chaleureux. Spécialisé dans les plats locaux préparés avec des ingrédients frais du marché.",
  todaySpecials: [
    { 
      name: "Thiéboudienne Rouge", 
      price: 3500, 
      description: "Riz au poisson avec légumes variés et sauce tomate",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=150&fit=crop"
    },
    { 
      name: "Yassa Poulet", 
      price: 2800, 
      description: "Poulet mariné aux oignons et citron, servi avec du riz",
      image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=200&h=150&fit=crop"
    }
  ],
  categories: ["Cuisine Sénégalaise", "Halal", "Famille"],
  amenities: ["WiFi", "Terrasse", "Parking", "Climatisation"]
};

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // En production, récupérer les données depuis Supabase avec l'ID
  const restaurant = mockRestaurantDetail;

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec bouton retour */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>

      {/* Image principale */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover animate-scale-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Badges flottants */}
        <div className="absolute top-4 left-4 flex gap-2 animate-fade-in">
          {restaurant.openNow ? (
            <Badge className="bg-baobab text-white">Ouvert</Badge>
          ) : (
            <Badge variant="destructive">Fermé</Badge>
          )}
          {restaurant.deliveryAvailable && (
            <Badge className="bg-spice text-white">Livraison</Badge>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 animate-slide-up">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Informations du restaurant */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{restaurant.name}</h1>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-sahel text-sahel" />
                        <span className="font-medium">{restaurant.rating}</span>
                        <span>({restaurant.reviewCount} avis)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{restaurant.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">{restaurant.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {restaurant.categories.map((category, index) => (
                    <Badge key={index} variant="secondary">{category}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Plats du jour */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Plats du jour</h2>
                <div className="space-y-4">
                  {restaurant.todaySpecials.map((dish, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <img 
                        src={dish.image} 
                        alt={dish.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground">{dish.name}</h3>
                        <p className="text-muted-foreground text-sm">{dish.description}</p>
                        <p className="font-bold text-terracotta text-lg mt-1">
                          {dish.price.toLocaleString()} CFA
                        </p>
                      </div>
                      <Button variant="spice" size="sm">
                        Commander
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Galerie photos */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Photos</h2>
                <div className="grid grid-cols-3 gap-4">
                  {restaurant.gallery.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 rounded-lg object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Informations de contact */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Informations</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-spice" />
                    <div>
                      <p className="font-medium">{restaurant.phone}</p>
                      <p className="text-sm text-muted-foreground">Appeler pour commander</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-spice" />
                    <div>
                      <p className="font-medium">{restaurant.openingHours}</p>
                      <p className="text-sm text-muted-foreground">Horaires d'ouverture</p>
                    </div>
                  </div>
                  
                  {restaurant.deliveryAvailable && (
                    <div className="flex items-center space-x-3">
                      <Truck className="w-5 h-5 text-spice" />
                      <div>
                        <p className="font-medium">{restaurant.deliveryTime}</p>
                        <p className="text-sm text-muted-foreground">
                          Livraison {restaurant.deliveryFee.toLocaleString()} CFA
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <Button variant="spice" className="w-full" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler maintenant
                  </Button>
                  
                  {restaurant.deliveryAvailable && (
                    <Button variant="sahel" className="w-full" size="lg">
                      <Truck className="w-4 h-4 mr-2" />
                      Commander en livraison
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Services</h3>
                <div className="grid grid-cols-2 gap-2">
                  {restaurant.amenities.map((amenity, index) => (
                    <div key={index} className="text-sm text-muted-foreground bg-muted/50 p-2 rounded text-center">
                      {amenity}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;