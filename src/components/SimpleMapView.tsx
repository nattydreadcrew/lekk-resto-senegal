import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Star, Clock, Truck, AlertCircle } from 'lucide-react';

// Types
type LatLngTuple = [number, number];

interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  deliveryAvailable: boolean;
  openNow: boolean;
  coordinates: LatLngTuple;
  todaySpecials: { name: string; price: number }[];
}

// Position par défaut (Dakar)
const DEFAULT_CENTER: LatLngTuple = [14.6928, -17.4467];

// Mock data restaurants avec coordonnées
const restaurantsWithCoords: Restaurant[] = [
  {
    id: "1",
    name: "Chez Fatou",
    address: "Plateau, Dakar",
    phone: "+221 77 123 45 67",
    rating: 4.8,
    deliveryAvailable: true,
    openNow: true,
    coordinates: [14.6928, -17.4467],
    todaySpecials: [
      { name: "Thiéboudienne", price: 3500 },
      { name: "Yassa Poulet", price: 2800 }
    ]
  },
  {
    id: "2",
    name: "Restaurant Teranga", 
    address: "Almadies, Dakar",
    phone: "+221 78 987 65 43",
    rating: 4.6,
    deliveryAvailable: true,
    openNow: true,
    coordinates: [14.7392, -17.5197],
    todaySpecials: [
      { name: "Mafé Bœuf", price: 4000 },
      { name: "Poisson Braisé", price: 3200 }
    ]
  },
  {
    id: "3",
    name: "Le Baobab Gourmand",
    address: "Medina, Dakar", 
    phone: "+221 76 555 44 33",
    rating: 4.4,
    deliveryAvailable: false,
    openNow: true,
    coordinates: [14.6892, -17.4568],
    todaySpecials: [
      { name: "Caldou", price: 2500 },
      { name: "Domoda", price: 2200 }
    ]
  },
  {
    id: "4",
    name: "Saveurs du Sahel",
    address: "Point E, Dakar",
    phone: "+221 77 888 99 00", 
    rating: 4.7,
    deliveryAvailable: true,
    openNow: false,
    coordinates: [14.7155, -17.4631],
    todaySpecials: [
      { name: "Lakhou Bissap", price: 1800 },
      { name: "Ndolé", price: 3800 }
    ]
  },
  {
    id: "5",
    name: "Chez Aminata",
    address: "Parcelles Assainies, Dakar",
    phone: "+221 78 222 11 44",
    rating: 4.5,
    deliveryAvailable: true,
    openNow: true,
    coordinates: [14.7667, -17.4167],
    todaySpecials: [
      { name: "Suppa Kandja", price: 2700 },
      { name: "Pastels", price: 500 }
    ]
  }
];

const RADIUS_OPTIONS = [
  { value: '500', label: '500m' },
  { value: '1000', label: '1 km' },
  { value: '2000', label: '2 km' },
  { value: '3000', label: '3 km' },
  { value: '5000', label: '5 km' }
];

const SimpleMapView = () => {
  const [userLocation, setUserLocation] = useState<LatLngTuple>(DEFAULT_CENTER);
  const [selectedRadius, setSelectedRadius] = useState('500');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculer la distance entre deux points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371000; // Rayon de la terre en mètres
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Filtrer les restaurants selon le rayon
  const filteredRestaurants = useMemo(() => {
    const radius = parseInt(selectedRadius);
    return restaurantsWithCoords.filter(restaurant => {
      const distance = calculateDistance(
        userLocation[0], userLocation[1],
        restaurant.coordinates[0], restaurant.coordinates[1]
      );
      return distance <= radius;
    });
  }, [selectedRadius, userLocation]);

  // Obtenir la géolocalisation de l'utilisateur
  useEffect(() => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setIsLoading(false);
        },
        (error) => {
          console.log("Géolocalisation non disponible, utilisation de la position par défaut");
          setError("Géolocalisation non disponible. Utilisation de Dakar par défaut.");
          setIsLoading(false);
        }
      );
    } else {
      setError("Géolocalisation non supportée par ce navigateur.");
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex items-center justify-center h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p>Chargement de la carte...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Restaurants autour de vous
          </CardTitle>
          {error && (
            <div className="flex items-center gap-2 text-amber-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="radius-select" className="text-sm font-medium">
                Rayon de recherche :
              </label>
              <Select value={selectedRadius} onValueChange={setSelectedRadius}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Rayon" />
                </SelectTrigger>
                <SelectContent>
                  {RADIUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredRestaurants.length} restaurant(s) trouvé(s)
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Liste des restaurants en attendant que la carte fonctionne */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Restaurants dans un rayon de {selectedRadius === '1000' ? '1 km' : selectedRadius === '500' ? '500m' : `${parseInt(selectedRadius)/1000} km`}</h3>
            <div className="grid gap-4">
              {filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{restaurant.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{restaurant.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurant.address}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={restaurant.openNow ? "default" : "secondary"}>
                      <Clock className="w-3 h-3 mr-1" />
                      {restaurant.openNow ? "Ouvert" : "Fermé"}
                    </Badge>
                    <Badge variant={restaurant.deliveryAvailable ? "default" : "secondary"}>
                      <Truck className="w-3 h-3 mr-1" />
                      {restaurant.deliveryAvailable ? "Livraison" : "Sur place"}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-medium text-sm">Plats du jour :</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                      {restaurant.todaySpecials.map((dish, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{dish.name}</span>
                          <span className="font-medium">{dish.price} FCFA</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredRestaurants.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Aucun restaurant trouvé dans ce rayon. Essayez d'augmenter le rayon de recherche.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleMapView;