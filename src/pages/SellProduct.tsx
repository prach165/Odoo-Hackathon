import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Heart } from "lucide-react";
import { PRODUCT_CATEGORIES, ProductCategory } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface ProductFormData {
  title: string;
  description: string;
  price: string;
  category: ProductCategory | '';
  image: File | null;
}

export default function SellProduct() {
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.price || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate product creation
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Product listed successfully!",
        description: "Your sustainable item is now available for others to discover.",
      });
      navigate('/my-listings');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Sell Your Item</h1>
            <p className="text-muted-foreground">
              Give your item a second life and help build a sustainable future
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Product Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="What are you selling?"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item's condition, features, and why it's special..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                {/* Category and Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange('category', value)}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRODUCT_CATEGORIES.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Price ($) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image">Product Image</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label htmlFor="image" className="cursor-pointer">
                      {formData.image ? (
                        <div className="space-y-2">
                          <div className="w-24 h-24 mx-auto bg-muted rounded-lg flex items-center justify-center">
                            <Heart className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formData.image.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Click to change image
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                          <p className="text-muted-foreground">
                            Click to upload an image
                          </p>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG, GIF up to 10MB
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Listing Product..." : "List Product"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Tips for a Great Listing</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use clear, high-quality photos showing the item's condition</li>
                <li>• Be honest about any wear, damage, or defects</li>
                <li>• Include measurements and brand information when relevant</li>
                <li>• Price competitively by checking similar items</li>
                <li>• Highlight what makes your item special or unique</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}