import RestaurantCard from "./RestaurantCard";

// Mock data - sera remplacé par les vraies données de Supabase
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
  },
  {
    id: "4",
    name: "Saveurs du Sahel",
    image: "https://images.unsplash.com/photo-1555992336-03a23c64dc96?w=500&h=300&fit=crop", 
    address: "Point E, Dakar",
    phone: "+221 77 888 99 00",
    rating: 4.7,
    deliveryAvailable: true,
    openNow: false,
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
    phone: "+221 78 222 11 44",
    rating: 4.5,
    deliveryAvailable: true,
    openNow: true,
    todaySpecials: [
      { name: "Suppa Kandja", price: 2700 },
      { name: "Pastels", price: 500 }
    ]
  },
  {
    id: "6",
    name: "Restaurant Saloum",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop",
    address: "Liberté 6, Dakar",
    phone: "+221 76 333 22 55", 
    rating: 4.3,
    deliveryAvailable: true,
    openNow: true,
    todaySpecials: [
      { name: "Tiep Bou Guenar", price: 3000 },
      { name: "Mbaxal-u-Saloum", price: 3500 }
    ]
  }
];

const RestaurantGrid = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Restaurants populaires
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez les meilleurs restaurants avec leurs plats du jour fraîchement préparés
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRestaurants.map((restaurant, index) => (
            <div key={restaurant.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <p className="text-muted-foreground mb-4">
            Plus de restaurants disponibles dans votre région
          </p>
          <div className="space-x-4">
            <button className="text-primary hover:text-primary/80 font-medium">
              Voir tous les restaurants
            </button>
            <span className="text-muted-foreground">|</span>
            <button className="text-primary hover:text-primary/80 font-medium">
              Filtrer par quartier
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantGrid;