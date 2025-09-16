import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MapView from '@/components/MapView';

const MapPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Carte des restaurants
          </h1>
          <p className="text-muted-foreground">
            Explorez les restaurants autour de vous et ajustez le rayon de recherche selon vos préférences
          </p>
        </div>
        <MapView />
      </main>
      <Footer />
    </div>
  );
};

export default MapPage;