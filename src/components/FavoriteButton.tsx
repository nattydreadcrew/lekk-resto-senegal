import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FavoriteButtonProps {
  restaurantId: string;
  className?: string;
}

const FavoriteButton = ({ restaurantId, className = "" }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Vérifier si le restaurant est en favoris dans localStorage
    const favorites = JSON.parse(localStorage.getItem('lekk-resto-favorites') || '[]');
    setIsFavorite(favorites.includes(restaurantId));
  }, [restaurantId]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher la navigation vers la page du restaurant
    
    const favorites = JSON.parse(localStorage.getItem('lekk-resto-favorites') || '[]');
    
    if (isFavorite) {
      // Retirer des favoris
      const newFavorites = favorites.filter((id: string) => id !== restaurantId);
      localStorage.setItem('lekk-resto-favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      // Ajouter aux favoris
      const newFavorites = [...favorites, restaurantId];
      localStorage.setItem('lekk-resto-favorites', JSON.stringify(newFavorites));
      setIsFavorite(true);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleFavorite}
      className={`transition-all duration-200 hover:scale-110 ${className}`}
    >
      <Heart 
        className={`w-5 h-5 transition-colors ${
          isFavorite 
            ? 'fill-red-500 text-red-500' 
            : 'text-muted-foreground hover:text-red-500'
        }`} 
      />
    </Button>
  );
};

export default FavoriteButton;