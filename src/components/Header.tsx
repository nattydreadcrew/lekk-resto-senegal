import { useNavigate } from "react-router-dom";
import { Search, MapPin, Phone, Heart, User, LogOut, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-terracotta to-spice bg-clip-text text-transparent">Plat du jour</h1>
            <span className="text-sm text-muted-foreground">Sénégal</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/favorites')}>
              <Heart className="w-4 h-4 mr-1" />
              Favoris
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/map')}>
              <Map className="w-4 h-4 mr-1" />
              Carte
            </Button>
            
            {user ? (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate('/owner/dashboard')}>
                  Propriétaire
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>
                <User className="w-4 h-4 mr-1" />
                Connexion
              </Button>
            )}
          </div>
        </div>
        
        
      </div>
    </header>;
};
export default Header;