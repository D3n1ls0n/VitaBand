import { CartItem } from './cart.model';
import { User } from './user.model';

export interface Order {
  id: string;
  user: User;
  items: CartItem[];
  subtotal: number;
  taxes: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'creditCard' | 'debitCard' | 'paypal' | 'bankTransfer';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';