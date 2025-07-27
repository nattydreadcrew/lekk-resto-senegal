import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo et description */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-sahel to-spice bg-clip-text text-transparent">
              Lekk Resto
            </h3>
            <p className="text-primary-foreground/80 mb-4">
              Découvrez les meilleurs restaurants du Sénégal et leurs délicieux plats du jour.
            </p>
            <div className="flex space-x-4">
              <Instagram className="w-5 h-5 text-primary-foreground/60 hover:text-sahel cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-primary-foreground/60 hover:text-sahel cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Liens rapides */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-sahel transition-colors">Tous les restaurants</a></li>
              <li><a href="#" className="hover:text-sahel transition-colors">Cuisine traditionnelle</a></li>
              <li><a href="#" className="hover:text-sahel transition-colors">Livraison</a></li>
              <li><a href="#" className="hover:text-sahel transition-colors">À propos</a></li>
            </ul>
          </div>

          {/* Pour les restaurants */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h4 className="text-lg font-semibold mb-4">Restaurateurs</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-sahel transition-colors">Ajouter votre restaurant</a></li>
              <li><a href="#" className="hover:text-sahel transition-colors">Gérer votre menu</a></li>
              <li><a href="#" className="hover:text-sahel transition-colors">Conditions</a></li>
              <li><a href="#" className="hover:text-sahel transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Dakar, Sénégal</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+221 XX XXX XX XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@lekkresto.sn</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 Lekk Resto. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;