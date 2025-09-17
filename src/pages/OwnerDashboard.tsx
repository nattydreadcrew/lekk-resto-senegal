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
        }
      }
      setLoading(false);
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

            {/* Menu du jour - placeholder for now */}
            <TabsContent value="menu" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="w-5 h-5 text-spice" />
                    <span>Ajouter un plat du jour</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  Cette section sera connectée à Supabase (table daily_specials). Pour l'instant, créez d'abord votre restaurant.
                </CardContent>
              </Card>
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
