import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !displayName || !restaurantName) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    setLoading(true);
    setError('');

    const redirectUrl = `${window.location.origin}/owner/dashboard`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName,
          restaurant_name: restaurantName,
          phone: phone,
          role: 'producer'
        }
      }
    });

    setLoading(false);

    if (error) {
      if (error.message.includes('already registered')) {
        setError('Un compte existe déjà avec cette adresse email. Essayez de vous connecter.');
      } else {
        setError(error.message);
      }
    } else {
      toast.success('Compte créé avec succès! Vérifiez votre email pour confirmer votre inscription avant de pouvoir vous connecter.');
      // Clear form after successful signup
      setEmail('');
      setPassword('');
      setDisplayName('');
      setRestaurantName('');
      setPhone('');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setError('Email ou mot de passe incorrect. Assurez-vous d\'avoir confirmé votre email après l\'inscription.');
      } else if (error.message.includes('Email not confirmed')) {
        setError('Veuillez confirmer votre email avant de vous connecter. Vérifiez votre boîte de réception.');
      } else {
        setError(error.message);
      }
    } else {
      toast.success('Connexion réussie!');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-display bg-gradient-to-r from-terracotta to-spice bg-clip-text text-transparent">
            Plat du jour
          </CardTitle>
          <CardDescription>
            Plateforme de gestion pour restaurateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Inscrire mon restaurant</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-foreground">Créez votre compte restaurateur</h3>
                  <p className="text-sm text-muted-foreground">Gérez vos plats du jour et votre restaurant</p>
                </div>
                
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Votre nom et prénom *"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Nom de votre restaurant *"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email professionnel *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Input
                    type="tel"
                    placeholder="Téléphone (optionnel)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Mot de passe (min. 6 caractères) *"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Création en cours...' : 'Créer mon compte restaurateur'}
                </Button>
                
                <div className="space-y-2 text-xs text-muted-foreground text-center">
                  <p>
                    En créant votre compte, vous pourrez gérer vos plats du jour, vos informations restaurant et interagir avec vos clients.
                  </p>
                  <p className="font-medium">
                    📧 Après inscription, vérifiez votre email pour confirmer votre compte avant de vous connecter.
                  </p>
                </div>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-sm"
            >
              Retour à l'accueil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;