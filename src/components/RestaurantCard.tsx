import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Star } from "lucide-react";

interface Dish {
  name: string;
  price: number;
}

interface Restaurant {
  id: string;
  name: string;
  image: string;
  address: string;
  phone: string;
  rating: number;
  deliveryAvailable: boolean;
  openNow: boolean;
  todaySpecials: Dish[];
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
}

const RestaurantCard = ({ restaurant, onClick }: RestaurantCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-warm transition-all duration-300 cursor-pointer group" onClick={onClick}>
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          {restaurant.openNow ? (
            <Badge className="bg-baobab text-white">Ouvert</Badge>
          ) : (
            <Badge variant="destructive">Fermé</Badge>
          )}
        </div>
        {restaurant.deliveryAvailable && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-spice text-white">Livraison</Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {restaurant.name}
            </h3>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{restaurant.address}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-sahel text-sahel" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Plats du jour:</h4>
          <div className="space-y-1">
            {restaurant.todaySpecials.map((dish, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{dish.name}</span>
                <span className="font-medium text-terracotta">{dish.price.toLocaleString()} CFA</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Phone className="w-3 h-3" />
            <span>{restaurant.phone}</span>
          </div>
          <Button variant="sahel" size="sm">
            Voir détails
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;