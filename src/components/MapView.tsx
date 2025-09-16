import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import L from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Star, Clock, Truck } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix pour les icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Position par défaut (Dakar)
const DEFAULT_CENTER: LatLngTuple = [14.6928, -17.4467];

// Mock data restaurants avec coordonnées
const restaurantsWithCoords = [
  {
    id: "1",
    name: "Chez Fatou",
    address: "Plateau, Dakar",
    phone: "+221 77 123 45 67",
    rating: 4.8,
    deliveryAvailable: true,
    openNow: true,
    coordinates: [14.6928, -17.4467] as LatLngTuple,
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
    coordinates: [14.7392, -17.5197] as LatLngTuple,
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
    coordinates: [14.6892, -17.4568] as LatLngTuple,
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
    coordinates: [14.7155, -17.4631] as LatLngTuple,
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
    coordinates: [14.7667, -17.4167] as LatLngTuple,
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

const MapView = () => {
  const [userLocation, setUserLocation] = useState<LatLngTuple>(DEFAULT_CENTER);
  const [selectedRadius, setSelectedRadius] = useState('500');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantsWithCoords);

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
  useEffect(() => {
    const radius = parseInt(selectedRadius);
    const filtered = restaurantsWithCoords.filter(restaurant => {
      const distance = calculateDistance(
        userLocation[0], userLocation[1],
        restaurant.coordinates[0], restaurant.coordinates[1]
      );
      return distance <= radius;
    });
    setFilteredRestaurants(filtered);
  }, [selectedRadius, userLocation]);

  // Obtenir la géolocalisation de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          // Utiliser la position par défaut en cas d'erreur
          console.log("Géolocalisation non disponible, utilisation de la position par défaut");
        }
      );
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Restaurants autour de vous
          </CardTitle>
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
          <div className="h-[400px] rounded-lg overflow-hidden">
            <MapContainer
              center={userLocation}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Cercle du rayon de recherche */}
              <Circle
                center={userLocation}
                radius={parseInt(selectedRadius)}
                pathOptions={{
                  fillColor: 'hsl(var(--primary))',
                  fillOpacity: 0.1,
                  color: 'hsl(var(--primary))',
                  weight: 2
                }}
              />
              
              {/* Marqueur de l'utilisateur */}
              <Marker position={userLocation}>
                <Popup>Votre position</Popup>
              </Marker>
              
              {/* Marqueurs des restaurants */}
              {filteredRestaurants.map((restaurant) => (
                <Marker key={restaurant.id} position={restaurant.coordinates}>
                  <Popup className="min-w-[250px]">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{restaurant.address}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{restaurant.rating}</span>
                        </div>
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
                        <h4 className="font-medium text-sm">Plats du jour :</h4>
                        {restaurant.todaySpecials.map((dish, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{dish.name}</span>
                            <span className="font-medium">{dish.price} FCFA</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;