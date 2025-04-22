import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Order, OrderStatus } from '../models/order.model';
import { Cart } from '../models/cart.model';
import { User } from '../models/user.model';
import { MOCK_ORDERS } from '../data/mock-orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = MOCK_ORDERS;

  constructor() {}

  getOrdersByUser(userId: string): Observable<Order[]> {
    const userOrders = this.orders.filter(order => order.user.id === userId);
    return of(userOrders).pipe(delay(500)); // Simulate network delay
  }

  getOrderById(orderId: string): Observable<Order | undefined> {
    const order = this.orders.find(o => o.id === orderId);
    return of(order).pipe(delay(300)); // Simulate network delay
  }

  getAllOrders(): Observable<Order[]> {
    return of(this.orders).pipe(delay(500)); // Simulate network delay
  }

  createOrder(user: User, cart: Cart, paymentMethod: string, shippingAddress: any): Observable<Order> {
    const newOrder: Order = {
      id: 'order-' + Math.random().toString(36).substr(2),
      user,
      items: [...cart.items],
      subtotal: cart.subtotal,
      taxes: cart.taxes,
      shipping: cart.shipping,
      total: cart.total,
      status: 'pending',
      paymentMethod: paymentMethod as any,
      paymentStatus: 'pending',
      shippingAddress,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.orders.push(newOrder);
    return of(newOrder).pipe(delay(800)); // Simulate network delay
  }

  updateOrderStatus(orderId: string, status: OrderStatus): Observable<Order> {
    const orderIndex = this.orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    const updatedOrder = {
      ...this.orders[orderIndex],
      status,
      updatedAt: new Date()
    };
    
    this.orders[orderIndex] = updatedOrder;
    return of(updatedOrder).pipe(delay(500)); // Simulate network delay
  }
}