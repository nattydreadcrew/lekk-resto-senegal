import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Edit, Trash2, Camera, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Type for a restaurant row (subset of DB columns we use here)
interface RestaurantRow {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  image_url: string | null;
}

// Type for daily special
interface DailySpecial {
  id: string;
  restaurant_id: string;
  name: string;
  description: string | null;
  price: number;
  available_date: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState<RestaurantRow | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Create form state (shown if no restaurant exists yet)
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Daily special form state
  const [specialName, setSpecialName] = useState("");
  const [specialDescription, setSpecialDescription] = useState("");
  const [specialPrice, setSpecialPrice] = useState("");
  const [specialDate, setSpecialDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailySpecials, setDailySpecials] = useState<DailySpecial[]>([]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      toast.error("Vous devez être connecté pour accéder au tableau de bord.");
      navigate("/auth");
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching restaurant:", error);
        setError(error.message);
      } else {
        setRestaurant(data as RestaurantRow | null);
        if (data) {
          // Prefill form fields with existing restaurant values for the edit tab
          setName(data.name ?? "");
          setAddress(data.address ?? "");
          setDescription(data.description ?? "");
          setPhone(data.phone ?? "");
          setEmail(data.email ?? "");

          // Load daily specials for this restaurant
          loadDailySpecials(data.id);
        }
      }
      setLoading(false);
    };

  const loadDailySpecials = async (restaurantId: string) => {
      const today = new Date().toISOString().split('T')[0];

      // Delete specials older than today (keep only today's records)
      await supabase
        .from("daily_specials")
        .delete()
        .eq("restaurant_id", restaurantId)
        .lt("available_date", today);

      // Fetch today's specials only
      const { data, error } = await supabase
        .from("daily_specials")
        .select("*")
        .eq("restaurant_id", restaurantId)
        .eq("available_date", today)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching daily specials:", error);
      } else {
        setDailySpecials(data || []);
      }
    };

    load();
  }, [authLoading, user, navigate]);

  const handleCreate = async () => {
    if (!user) return;
    if (!name.trim()) {
      toast.error("Le nom du restaurant est obligatoire.");
      return;
    }

    const { data, error } = await supabase
      .from("restaurants")
      .insert({
        owner_id: user.id,
        name: name.trim(),
        address: address.trim() || null,
        description: description.trim() || null,
        phone: phone.trim() || null,
        email: email.trim() || null,
      })
      .select("*")
      .single();

    if (error) {
      console.error("Error creating restaurant:", error);
      toast.error(error.message);
      return;
    }

    toast.success("Restaurant créé avec succès !");
    setRestaurant(data as RestaurantRow);
  };

  const handleCreateDailySpecial = async () => {
    if (!restaurant) return;
    if (dailySpecials.length >= 2) {
      toast.error("Vous avez déjà 2 menus pour aujourd'hui.");
      return;
    }
    if (!specialName.trim() || !specialPrice.trim()) {
      toast.error("Le nom et le prix sont obligatoires.");
      return;
    }

    const price = parseFloat(specialPrice);
    if (isNaN(price) || price <= 0) {
      toast.error("Le prix doit être un nombre valide.");
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from("daily_specials")
      .insert({
        restaurant_id: restaurant.id,
        name: specialName.trim(),
        description: specialDescription.trim() || null,
        price: price,
        available_date: today,
      })
      .select("*")
      .single();

    if (error) {
      console.error("Error creating daily special:", error);
      toast.error(error.message);
      return;
    }

    toast.success("Menu du jour ajouté avec succès !");
    setDailySpecials([data as DailySpecial, ...dailySpecials]);
    
    // Reset form
    setSpecialName("");
    setSpecialDescription("");
    setSpecialPrice("");
    setSpecialDate(new Date().toISOString().split('T')[0]);
  };

  const handleDeleteDailySpecial = async (specialId: string) => {
    const { error } = await supabase
      .from("daily_specials")
      .delete()
      .eq("id", specialId);

    if (error) {
      console.error("Error deleting daily special:", error);
      toast.error(error.message);
      return;
    }

    toast.success("Plat supprimé avec succès !");
    setDailySpecials(dailySpecials.filter(special => special.id !== specialId));
  };

  const isEditingAllowed = useMemo(() => !!restaurant, [restaurant]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Local page header */}
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
                <p className="text-sm text-muted-foreground">
                  {restaurant ? restaurant.name : "Aucun restaurant"}
                </p>
              </div>
            </div>
            {restaurant && (
              <div className="flex items-center space-x-2">
                <Badge className="bg-baobab text-white">
                  <Clock className="w-3 h-3 mr-1" />
                  Actif
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {!restaurant ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Créer mon restaurant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Nom du restaurant *" value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Adresse" value={address} onChange={(e) => setAddress(e.target.value)} />
              <Input placeholder="Téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <Button variant="spice" className="w-full" onClick={handleCreate}>
                Créer mon restaurant
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="menu" className="space-y-6">
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
                    <span>Ajouter un menu du jour (aujourd'hui)</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Maximum 2 menus pour aujourd'hui. Ils expirent automatiquement après 24h.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Nom du plat *</label>
                    <Input 
                      placeholder="Ex: Thieboudienne aux légumes"
                      value={specialName} 
                      onChange={(e) => setSpecialName(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Prix (FCFA) *</label>
                    <Input 
                      type="number"
                      placeholder="2500"
                      value={specialPrice} 
                      onChange={(e) => setSpecialPrice(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                    <Textarea 
                      placeholder="Description du plat..."
                      value={specialDescription} 
                      onChange={(e) => setSpecialDescription(e.target.value)} 
                      rows={3}
                    />
                  </div>
                  <Button
                    variant="spice"
                    className="w-full"
                    onClick={handleCreateDailySpecial}
                    disabled={dailySpecials.length >= 2}
                  >
                    {dailySpecials.length >= 2 
                      ? "Maximum 2 menus atteints pour aujourd'hui" 
                      : "Ajouter le menu du jour"}
                  </Button>
                </CardContent>
              </Card>

              {/* Liste des menus du jour (aujourd'hui) */}
              {dailySpecials.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Menus du jour d'aujourd'hui</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Ils seront automatiquement supprimés après 24h (minuit)
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dailySpecials.map((special) => (
                        <div key={special.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium text-foreground">{special.name}</h4>
                            <p className="text-sm text-muted-foreground">{special.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm font-medium text-spice">{special.price} FCFA</span>
                              <Badge variant={special.is_available ? "default" : "secondary"}>
                                {special.is_available ? "Disponible" : "Indisponible"}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteDailySpecial(special.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
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
                      <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Téléphone</label>
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Adresse</label>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                  <Button
                    variant="spice"
                    className="w-full"
                    onClick={async () => {
                      if (!restaurant) return;
                      const { error } = await supabase
                        .from("restaurants")
                        .update({
                          name: name.trim(),
                          address: address.trim() || null,
                          phone: phone.trim() || null,
                          email: email.trim() || null,
                          description: description.trim() || null,
                        })
                        .eq("id", restaurant.id);
                      if (error) {
                        toast.error(error.message);
                      } else {
                        toast.success("Informations mises à jour !");
                        setRestaurant({
                          ...restaurant,
                          name,
                          address,
                          phone,
                          email,
                          description,
                        });
                      }
                    }}
                    disabled={!isEditingAllowed}
                  >
                    Sauvegarder les modifications
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Statistiques - placeholder */}
            <TabsContent value="stats" className="space-y-6">
              <Card>
                <CardContent className="p-6 text-center text-sm text-muted-foreground">
                  Les statistiques seront bientôt disponibles.
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
