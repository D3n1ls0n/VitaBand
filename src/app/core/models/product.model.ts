export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  rating: number;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
  featured?: boolean;
  discount?: number;
  tags?: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price' | 'rating' | 'name';
  sortDirection?: 'asc' | 'desc';
}