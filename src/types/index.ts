export interface User {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  avatar?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrl?: string;
  sellerId: string;
  seller?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export type ProductCategory = 
  | 'clothing'
  | 'electronics'
  | 'furniture'
  | 'books'
  | 'sports'
  | 'home'
  | 'toys'
  | 'other';

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'clothing', label: 'Clothing & Fashion' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'books', label: 'Books & Media' },
  { value: 'sports', label: 'Sports & Outdoors' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'toys', label: 'Toys & Games' },
  { value: 'other', label: 'Other' },
];