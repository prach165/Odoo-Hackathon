import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRODUCT_CATEGORIES, ProductCategory } from "@/types";
import { Search, X } from "lucide-react";

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (search: string) => void;
  selectedCategory: ProductCategory | 'all';
  onCategoryChange: (category: ProductCategory | 'all') => void;
  minPrice?: number;
  maxPrice?: number;
  onPriceChange?: (min?: number, max?: number) => void;
  onClearFilters: () => void;
}

export function ProductFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceChange,
  onClearFilters
}: ProductFiltersProps) {
  const [priceMin, setPriceMin] = useState(minPrice?.toString() || '');
  const [priceMax, setPriceMax] = useState(maxPrice?.toString() || '');

  const handlePriceFilter = () => {
    const min = priceMin ? parseFloat(priceMin) : undefined;
    const max = priceMax ? parseFloat(priceMax) : undefined;
    onPriceChange?.(min, max);
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || minPrice !== undefined || maxPrice !== undefined;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Filter Products
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="h-8"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="search"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={selectedCategory}
            onValueChange={(value) => onCategoryChange(value as ProductCategory | 'all')}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        {onPriceChange && (
          <div className="space-y-2">
            <Label>Price Range</Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Max"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="flex-1"
              />
            </div>
            <Button 
              onClick={handlePriceFilter} 
              variant="outline" 
              size="sm"
              className="w-full"
            >
              Apply Price Filter
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}