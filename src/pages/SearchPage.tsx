import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Search, MapPin, Filter, SlidersHorizontal } from "lucide-react";
import RestaurantCard from "@/components/RestaurantCard";

// Mock data étendu pour la recherche
const mockRestaurants = [
  {
    id: "1",
    name: "Chez Fatou",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=300&fit=crop",
    address: "Plateau, Dakar",
    district: "Plateau",
    phone: "+221 77 123 45 67",
    rating: 4.8,
    deliveryAvailable: true,
    openNow: true,
    priceRange: "$$",
    cuisine: "Traditionnelle",
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
    district: "Almadies",
    phone: "+221 78 987 65 43",
    rating: 4.6,
    deliveryAvailable: true,
    openNow: true,
    priceRange: "$$$",
    cuisine: "Moderne",
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
    district: "Medina",
    phone: "+221 76 555 44 33",
    rating: 4.4,
    deliveryAvailable: false,
    openNow: true,
    priceRange: "$",
    cuisine: "Traditionnelle",
    todaySpecials: [
      { name: "Caldou", price: 2500 },
      { name: "Domoda", price: 2200 }
    ]
  },
  {
    id: "4",
    name: "Saveurs du Sahel",
    image: "https://images.unsplash.com/photo-1555992336-03a23c64dc96?w=500&h=300&fit=crop", 
    address: "Point E, Dakar",
    district: "Point E",
    phone: "+221 77 888 99 00",
    rating: 4.7,
    deliveryAvailable: true,
    openNow: false,
    priceRange: "$$",
    cuisine: "Fusion",
    todaySpecials: [
      { name: "Lakhou Bissap", price: 1800 },
      { name: "Ndolé", price: 3800 }
    ]
  },
  {
    id: "5",
    name: "Chez Aminata",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=500&h=300&fit=crop",
    address: "Parcelles Assainies, Dakar", 
    district: "Parcelles",
    phone: "+221 78 222 11 44",
    rating: 4.5,
    deliveryAvailable: true,
    openNow: true,
    priceRange: "$",
    cuisine: "Fast Food",
    todaySpecials: [
      { name: "Suppa Kandja", price: 2700 },
      { name: "Pastels", price: 500 }
    ]
  }
];

const districts = ["Tous", "Plateau", "Almadies", "Medina", "Point E", "Parcelles", "Liberté", "HLM"];
const cuisineTypes = ["Toutes", "Traditionnelle", "Moderne", "Fusion", "Fast Food"];
const priceRanges = ["Tous", "$", "$$", "$$$"];

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("Tous");
  const [selectedCuisine, setSelectedCuisine] = useState("Toutes");
  const [selectedPriceRange, setSelectedPriceRange] = useState("Tous");
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [openNow, setOpenNow] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === "Tous" || restaurant.district === selectedDistrict;
    const matchesCuisine = selectedCuisine === "Toutes" || restaurant.cuisine === selectedCuisine;
    const matchesPriceRange = selectedPriceRange === "Tous" || restaurant.priceRange === selectedPriceRange;
    const matchesDelivery = !deliveryOnly || restaurant.deliveryAvailable;
    const matchesOpen = !openNow || restaurant.openNow;

    return matchesSearch && matchesDistrict && matchesCuisine && 
           matchesPriceRange && matchesDelivery && matchesOpen;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            
            <h1 className="text-xl font-display font-semibold text-foreground">
              Recherche de restaurants
            </h1>
            
            <Button 
              variant="ghost" 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Barre de recherche principale */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Rechercher un restaurant, quartier, plat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-muted/50 border-0 focus:bg-background"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar Filtres */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-32">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Filter className="w-5 h-5 text-spice" />
                  <h2 className="text-lg font-semibold text-foreground">Filtres</h2>
                </div>
                
                <div className="space-y-6">
                  
                  {/* Quartier */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Quartier</label>
                    <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map(district => (
                          <SelectItem key={district} value={district}>{district}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type de cuisine */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Type de cuisine</label>
                    <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cuisineTypes.map(cuisine => (
                          <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Gamme de prix */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Gamme de prix</label>
                    <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map(range => (
                          <SelectItem key={range} value={range}>
                            {range === "Tous" ? "Tous les prix" : 
                             range === "$" ? "Économique (< 3000 CFA)" :
                             range === "$$" ? "Moyen (3000 - 5000 CFA)" :
                             "Premium (> 5000 CFA)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground block">Options</label>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="delivery" 
                        checked={deliveryOnly}
                        onCheckedChange={(checked) => setDeliveryOnly(checked === true)}
                      />
                      <label htmlFor="delivery" className="text-sm text-muted-foreground">
                        Livraison disponible uniquement
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="openNow" 
                        checked={openNow}
                        onCheckedChange={(checked) => setOpenNow(checked === true)}
                      />
                      <label htmlFor="openNow" className="text-sm text-muted-foreground">
                        Ouvert maintenant
                      </label>
                    </div>
                  </div>

                  {/* Reset */}
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedDistrict("Tous");
                      setSelectedCuisine("Toutes");
                      setSelectedPriceRange("Tous");
                      setDeliveryOnly(false);
                      setOpenNow(false);
                      setSearchTerm("");
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Résultats */}
          <div className="flex-1">
            
            {/* Header des résultats */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {filteredRestaurants.length} restaurant{filteredRestaurants.length > 1 ? 's' : ''} trouvé{filteredRestaurants.length > 1 ? 's' : ''}
                </h2>
                {searchTerm && (
                  <p className="text-muted-foreground">
                    Résultats pour "{searchTerm}"
                  </p>
                )}
              </div>
              
              {/* Filtres actifs */}
              <div className="flex flex-wrap gap-2">
                {selectedDistrict !== "Tous" && (
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedDistrict}</span>
                  </Badge>
                )}
                {selectedCuisine !== "Toutes" && (
                  <Badge variant="secondary">{selectedCuisine}</Badge>
                )}
                {deliveryOnly && (
                  <Badge variant="secondary">Livraison</Badge>
                )}
                {openNow && (
                  <Badge variant="secondary">Ouvert</Badge>
                )}
              </div>
            </div>

            {/* Grille des restaurants */}
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant, index) => (
                  <div key={restaurant.id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <RestaurantCard restaurant={restaurant} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Aucun restaurant trouvé
                </h3>
                <p className="text-muted-foreground mb-4">
                  Essayez de modifier vos critères de recherche
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSelectedDistrict("Tous");
                    setSelectedCuisine("Toutes");
                    setSelectedPriceRange("Tous");
                    setDeliveryOnly(false);
                    setOpenNow(false);
                    setSearchTerm("");
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;