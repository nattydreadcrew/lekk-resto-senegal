-- Créer la table restaurants
CREATE TABLE public.restaurants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  cuisine_type TEXT,
  price_range TEXT CHECK (price_range IN ('€', '€€', '€€€')),
  opening_hours JSONB,
  delivery_available BOOLEAN DEFAULT false,
  delivery_radius INTEGER, -- en mètres
  coordinates POINT, -- Pour la géolocalisation
  image_url TEXT,
  cover_image_url TEXT,
  rating NUMERIC(2,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  total_reviews INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur la table restaurants
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les restaurants
CREATE POLICY "Restaurants are viewable by everyone" 
ON public.restaurants 
FOR SELECT 
USING (true);

CREATE POLICY "Restaurant owners can create their own restaurant" 
ON public.restaurants 
FOR INSERT 
WITH CHECK (owner_id IN (
  SELECT id FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'producer'
));

CREATE POLICY "Restaurant owners can update their own restaurant" 
ON public.restaurants 
FOR UPDATE 
USING (owner_id IN (
  SELECT id FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'producer'
));

CREATE POLICY "Restaurant owners can delete their own restaurant" 
ON public.restaurants 
FOR DELETE 
USING (owner_id IN (
  SELECT id FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'producer'
));

CREATE POLICY "Admins can manage all restaurants" 
ON public.restaurants 
FOR ALL 
USING (is_admin(auth.uid()));

-- Créer la table des plats du jour
CREATE TABLE public.daily_specials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL CHECK (price > 0),
  category TEXT,
  available_date DATE NOT NULL DEFAULT CURRENT_DATE,
  available_quantity INTEGER,
  remaining_quantity INTEGER,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur daily_specials
ALTER TABLE public.daily_specials ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour daily_specials
CREATE POLICY "Daily specials are viewable by everyone" 
ON public.daily_specials 
FOR SELECT 
USING (true);

CREATE POLICY "Restaurant owners can manage their daily specials" 
ON public.daily_specials 
FOR ALL 
USING (restaurant_id IN (
  SELECT r.id FROM public.restaurants r
  INNER JOIN public.profiles p ON r.owner_id = p.id
  WHERE p.user_id = auth.uid() AND p.role = 'producer'
));

-- Modifier la fonction handle_new_user pour créer des profils de producteurs par défaut
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, role, phone, location)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    -- Par défaut, tous les nouveaux utilisateurs sont des producteurs (propriétaires de restaurant)
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'producer'::user_role),
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'location'
  );
  RETURN NEW;
END;
$$;

-- Créer le trigger pour la mise à jour automatique des timestamps
CREATE TRIGGER update_restaurants_updated_at
BEFORE UPDATE ON public.restaurants
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_daily_specials_updated_at
BEFORE UPDATE ON public.daily_specials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();