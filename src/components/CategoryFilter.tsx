import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChefHat, Utensils, Coffee, Star } from "lucide-react";

const categories = [
  { name: "Cuisine Traditionnelle", icon: ChefHat, count: 85, color: "bg-terracotta" },
  { name: "Fast Food", icon: Utensils, count: 42, color: "bg-spice" },
  { name: "Café & Boissons", icon: Coffee, count: 28, color: "bg-sahel" },
  { name: "Recommandés", icon: Star, count: 15, color: "bg-baobab" }
];

const CategoryFilter = () => {
  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Explorez par catégorie
          </h2>
          <p className="text-muted-foreground">
            Trouvez exactement ce que vous cherchez
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div 
              key={category.name}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-slide-up"
            >
              <Button 
                variant="ghost" 
                className="h-auto p-6 flex-col space-y-3 hover:bg-background hover:shadow-md transition-all duration-300 w-full group"
              >
                <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">{category.name}</p>
                  <p className="text-sm text-muted-foreground">{category.count} restaurants</p>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;