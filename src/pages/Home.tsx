import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Heart, Recycle, Globe, Users } from "lucide-react";
import { Product, ProductCategory } from "@/types";

// Mock data for demonstration
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic 90s denim jacket in excellent condition. Perfect for sustainable fashion lovers.',
    price: 45.99,
    category: 'clothing',
    imageUrl: undefined,
    sellerId: 'user1',
    seller: { id: 'user1', email: 'seller@example.com', username: 'VintageVibes', createdAt: '2024-01-01' },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'iPhone 12 Pro - Good Condition',
    description: 'iPhone 12 Pro 128GB, minor scratches but fully functional. Comes with charger.',
    price: 599.00,
    category: 'electronics',
    imageUrl: undefined,
    sellerId: 'user2',
    seller: { id: 'user2', email: 'tech@example.com', username: 'TechSaver', createdAt: '2024-01-01' },
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16'
  },
  {
    id: '3',
    title: 'Wooden Coffee Table',
    description: 'Beautiful handcrafted wooden coffee table. Some wear but adds character.',
    price: 125.00,
    category: 'furniture',
    imageUrl: undefined,
    sellerId: 'user3',
    seller: { id: 'user3', email: 'furniture@example.com', username: 'WoodCrafter', createdAt: '2024-01-01' },
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17'
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter products based on search and category
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (productId: string) => {
    setCartItems(prev => [...prev, productId]);
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        cartItemCount={cartItems.length}
        isAuthenticated={true}
        onLogout={() => console.log('Logout')}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your <span className="text-primary">Preloved</span> Gems
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover sustainable treasures and give items a second life. Join our community of eco-conscious shoppers.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="flex items-center gap-2 p-2 px-4">
              <Recycle className="w-4 h-4" />
              Sustainable Shopping
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2 p-2 px-4">
              <Globe className="w-4 h-4" />
              Reduce Waste
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2 p-2 px-4">
              <Users className="w-4 h-4" />
              Community Driven
            </Badge>
          </div>

          <Button size="lg" className="text-lg px-8">
            Start Shopping
          </Button>
        </div>
      </section>

      <Separator />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0">
            <ProductFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedCategory === 'all' ? 'All Products' : `${selectedCategory} Products`}
              </h2>
              <span className="text-muted-foreground">
                {filteredProducts.length} items found
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.includes(product.id)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}