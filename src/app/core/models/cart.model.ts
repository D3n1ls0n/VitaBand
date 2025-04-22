import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  taxes: number;
  shipping: number;
  total: number;
}