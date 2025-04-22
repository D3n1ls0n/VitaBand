import { Injectable, signal } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'vitaband_cart';
  private TAX_RATE = 0.07; // 7% tax rate
  private SHIPPING_COST = 5.99;
  
  // Use signal for reactive cart state management
  private cartSignal = signal<Cart>({
    items: [],
    totalItems: 0,
    subtotal: 0,
    taxes: 0,
    shipping: 0,
    total: 0
  });
  
  cart = this.cartSignal.asReadonly();

  constructor() {
    this.loadCartFromStorage();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartSignal();
    const existingItemIndex = currentCart.items.findIndex(
      item => item.product.id === product.id
    );

    let updatedItems: CartItem[];

    if (existingItemIndex !== -1) {
      // Product already in cart, update quantity
      updatedItems = [...currentCart.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity
      };
    } else {
      // Product not in cart, add new item
      updatedItems = [...currentCart.items, { product, quantity }];
    }

    this.updateCart(updatedItems);
  }

  removeFromCart(productId: string): void {
    const currentCart = this.cartSignal();
    const updatedItems = currentCart.items.filter(
      item => item.product.id !== productId
    );
    
    this.updateCart(updatedItems);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    const currentCart = this.cartSignal();
    const updatedItems = currentCart.items.map(item => 
      item.product.id === productId 
        ? { ...item, quantity } 
        : item
    );
    
    this.updateCart(updatedItems);
  }

  clearCart(): void {
    this.updateCart([]);
  }

  private updateCart(items: CartItem[]): void {
    const totalItems = this.calculateTotalItems(items);
    const subtotal = this.calculateSubtotal(items);
    const taxes = subtotal * this.TAX_RATE;
    const shipping = items.length > 0 ? this.SHIPPING_COST : 0;
    const total = subtotal + taxes + shipping;
    
    const updatedCart: Cart = {
      items,
      totalItems,
      subtotal,
      taxes,
      shipping,
      total
    };
    
    this.cartSignal.set(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  private calculateTotalItems(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  private calculateSubtotal(items: CartItem[]): number {
    return items.reduce((total, item) => {
      const price = item.product.discount 
        ? item.product.price * (1 - item.product.discount / 100) 
        : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  }

  private saveCartToStorage(cart: Cart): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
  }

  private loadCartFromStorage(): void {
    const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart) as Cart;
        this.cartSignal.set(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from storage', error);
        localStorage.removeItem(this.CART_STORAGE_KEY);
      }
    }
  }
}