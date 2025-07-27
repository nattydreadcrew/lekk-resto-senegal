import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload, Plus, Edit, Trash2, Camera, Clock } from "lucide-react";

// Mock data pour le propriétaire - sera remplacé par Supabase
const mockOwnerData = {
  id: "owner1",
  name: "Fatou Diop",
  email: "fatou@chezfatou.sn",
  phone: "+221 77 123 45 67",
  restaurant: {
    id: "1",
    name: "Chez Fatou",
    address: "Plateau, Avenue Léopold Sédar Senghor, Dakar",
    description: "Restaurant traditionnel sénégalais offrant une cuisine authentique dans un cadre chaleureux.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop",
    openingHours: "11:00 - 22:00",
    deliveryAvailable: true,
    deliveryFee: 1000,
    categories: ["Cuisine Sénégalaise", "Halal", "Famille"]
  },
  todayMenu: [
    {
      id: "1",
      name: "Thiéboudienne Rouge",
      description: "Riz au poisson avec légumes variés et sauce tomate",
      price: 3500,
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=150&fit=crop",
      available: true
    },
    {
      id: "2",
      name: "Yassa Poulet",
      description: "Poulet mariné aux oignons et citron, servi avec du riz",
      price: 2800,
      image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=200&h=150&fit=crop",
      available: true
    }
  ]
};

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("menu");
  const [restaurant, setRestaurant] = useState(mockOwnerData.restaurant);
  const [todayMenu, setTodayMenu] = useState(mockOwnerData.todayMenu);
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });

  const handleAddDish = () => {
    if (newDish.name && newDish.price) {
      const dish = {
        id: Date.now().toString(),
        name: newDish.name,
        description: newDish.description,
        price: parseInt(newDish.price),
        image: newDish.image || "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=150&fit=crop",
        available: true
      };
      setTodayMenu([...todayMenu, dish]);
      setNewDish({ name: "", description: "", price: "", image: "" });
    }
  };

  const handleRemoveDish = (dishId: string) => {
    setTodayMenu(todayMenu.filter(dish => dish.id !== dishId));
  };

  const toggleDishAvailability = (dishId: string) => {
    setTodayMenu(todayMenu.map(dish =>
      dish.id === dishId ? { ...dish, available: !dish.available } : dish
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                  Tableau de bord
                </h1>
                <p className="text-sm text-muted-foreground">{restaurant.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge className="bg-baobab text-white">
                <Clock className="w-3 h-3 mr-1" />
                Ouvert
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="menu">Menu du jour</TabsTrigger>
            <TabsTrigger value="restaurant">Mon restaurant</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>

          {/* Menu du jour */}
          <TabsContent value="menu" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-spice" />
                  <span>Ajouter un plat du jour</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nom du plat"
                    value={newDish.name}
                    onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                  />
                  <Input
                    placeholder="Prix (CFA)"
                    type="number"
                    value={newDish.price}
                    onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                  />
                </div>
                <Textarea
                  placeholder="Description du plat"
                  value={newDish.description}
                  onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                />
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="URL de l'image (optionnel)"
                    value={newDish.image}
                    onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <Button onClick={handleAddDish} variant="spice" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter le plat
                </Button>
              </CardContent>
            </Card>

            {/* Liste des plats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todayMenu.map((dish) => (
                <Card key={dish.id} className={`${!dish.available ? 'opacity-60' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={dish.image} 
                        alt={dish.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">{dish.name}</h3>
                            <p className="text-sm text-muted-foreground">{dish.description}</p>
                            <p className="font-bold text-terracotta mt-1">
                              {dish.price.toLocaleString()} CFA
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleDishAvailability(dish.id)}
                            >
                              {dish.available ? (
                                <Badge className="bg-baobab text-white text-xs">Disponible</Badge>
                              ) : (
                                <Badge variant="destructive" className="text-xs">Épuisé</Badge>
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveDish(dish.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Informations restaurant */}
          <TabsContent value="restaurant" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Edit className="w-5 h-5 text-spice" />
                  <span>Informations du restaurant</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Nom du restaurant</label>
                    <Input
                      value={restaurant.name}
                      onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Téléphone</label>
                    <Input
                      value={mockOwnerData.phone}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Adresse</label>
                  <Input
                    value={restaurant.address}
                    onChange={(e) => setRestaurant({ ...restaurant, address: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                  <Textarea
                    value={restaurant.description}
                    onChange={(e) => setRestaurant({ ...restaurant, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Horaires d'ouverture</label>
                    <Input
                      value={restaurant.openingHours}
                      onChange={(e) => setRestaurant({ ...restaurant, openingHours: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Frais de livraison (CFA)</label>
                    <Input
                      type="number"
                      value={restaurant.deliveryFee}
                      onChange={(e) => setRestaurant({ ...restaurant, deliveryFee: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <Button variant="spice" className="w-full">
                  Sauvegarder les modifications
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistiques */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-spice mb-2">127</div>
                  <div className="text-sm text-muted-foreground">Commandes ce mois</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-terracotta mb-2">4.8</div>
                  <div className="text-sm text-muted-foreground">Note moyenne</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-baobab mb-2">89%</div>
                  <div className="text-sm text-muted-foreground">Taux de satisfaction</div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Plats les plus populaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayMenu.map((dish, index) => (
                    <div key={dish.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-spice text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{dish.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.floor(Math.random() * 50) + 10} commandes
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OwnerDashboard;