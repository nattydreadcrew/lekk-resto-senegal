import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProviders } from "@/components/AppProviders";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import SearchPage from "./pages/SearchPage";
import RestaurantDetail from "./pages/RestaurantDetail";
import OwnerDashboard from "./pages/OwnerDashboard";
import FavoritesPage from "./pages/FavoritesPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

function App() {
  console.log("App component rendering...");
  
  return (
    <AppProviders>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </AppProviders>
  );
}

export default App;
