import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  ShoppingCart, 
  ArrowLeft, 
  User, 
  Calendar,
  Shield,
  Truck
} from "lucide-react";
import { Product } from "@/types";

// Mock product data
const MOCK_PRODUCT: Product = {
  id: '1',
  title: 'Vintage Denim Jacket',
  description: 'Classic 90s denim jacket in excellent condition. This timeless piece features authentic vintage wash, classic button closure, and multiple pockets. Perfect for sustainable fashion lovers who appreciate quality craftsmanship. Shows minimal wear and has been well-maintained. A must-have addition to any eco-conscious wardrobe.',
  price: 45.99,
  category: 'clothing',
  imageUrl: undefined,
  sellerId: 'user1',
  seller: { 
    id: 'user1', 
    email: 'seller@example.com', 
    username: 'VintageVibes',
    fullName: 'Sarah Johnson',
    createdAt: '2024-01-01' 
  },
  createdAt: '2024-01-15',
  updatedAt: '2024-01-15'
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // In a real app, you'd fetch the product by ID
  const product = MOCK_PRODUCT;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </div>

        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Heart className="w-24 h-24 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart 
                    className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                  />
                </Button>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-4xl font-bold text-primary mb-4">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="font-medium">Quantity:</label>
                <select 
                  id="quantity"
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border rounded px-3 py-1"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <Button size="lg" className="w-full">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
            </div>

            <Separator />

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Seller Information
                </h3>
                <div className="space-y-2">
                  <p className="font-medium">{product.seller?.fullName || product.seller?.username}</p>
                  <p className="text-sm text-muted-foreground">@{product.seller?.username}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    Member since {new Date(product.seller?.createdAt || '').getFullYear()}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust & Safety */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Trust & Safety
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-primary" />
                    Verified seller
                  </li>
                  <li className="flex items-center">
                    <Truck className="w-4 h-4 mr-2 text-primary" />
                    Secure shipping
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-primary" />
                    Sustainable choice
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}