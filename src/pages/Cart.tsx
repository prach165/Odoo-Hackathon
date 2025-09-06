import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Heart,
  ArrowRight
} from "lucide-react";
import { CartItem, Product } from "@/types";

// Mock cart data
const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: '1',
    productId: '1',
    product: {
      id: '1',
      title: 'Vintage Denim Jacket',
      description: 'Classic 90s denim jacket in excellent condition.',
      price: 45.99,
      category: 'clothing',
      sellerId: 'user1',
      seller: { id: 'user1', email: 'seller@example.com', username: 'VintageVibes', createdAt: '2024-01-01' },
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    quantity: 1,
    addedAt: '2024-01-20'
  },
  {
    id: '2',
    productId: '2',
    product: {
      id: '2',
      title: 'iPhone 12 Pro - Good Condition',
      description: 'iPhone 12 Pro 128GB, minor scratches but fully functional.',
      price: 599.00,
      category: 'electronics',
      sellerId: 'user2',
      seller: { id: 'user2', email: 'tech@example.com', username: 'TechSaver', createdAt: '2024-01-01' },
      createdAt: '2024-01-16',
      updatedAt: '2024-01-16'
    },
    quantity: 1,
    addedAt: '2024-01-20'
  }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_CART_ITEMS);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Start shopping for sustainable treasures!
            </p>
            <Button asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartItemCount={cartItems.length} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-24 h-24 bg-muted rounded-lg overflow-hidden shrink-0">
                      {item.product.imageUrl ? (
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Heart className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="font-semibold hover:text-primary transition-colors"
                          >
                            {item.product.title}
                          </Link>
                          <Badge variant="outline" className="ml-2">
                            {item.product.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        Sold by {item.product.seller?.username}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-muted-foreground">
                              ${item.product.price.toFixed(2)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-primary">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders over $50
                  </p>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}