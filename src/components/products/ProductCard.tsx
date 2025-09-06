import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

export function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleFavorite, 
  isFavorite = false 
}: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="relative">
          <Link to={`/product/${product.id}`}>
            <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Heart className="w-12 h-12" />
                </div>
              )}
            </div>
          </Link>
          
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 hover:bg-background"
              onClick={() => onToggleFavorite(product.id)}
            >
              <Heart 
                className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
              />
            </Button>
          )}
          
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2 bg-primary/90 text-primary-foreground"
          >
            {product.category}
          </Badge>
        </div>
        
        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
              {product.title}
            </h3>
          </Link>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            
            {onAddToCart && (
              <Button 
                size="sm"
                onClick={() => onAddToCart(product.id)}
                className="shrink-0"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            )}
          </div>
          
          {product.seller && (
            <p className="text-xs text-muted-foreground mt-2">
              Sold by {product.seller.username}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}