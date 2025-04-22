import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { Order } from '../../../core/models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>My Orders</h2>
      @if (isLoading) {
        <p>Loading orders...</p>
      } @else if (orders.length === 0) {
        <div class="no-orders">
          <p>You haven't placed any orders yet.</p>
          <a routerLink="/products" class="btn-primary">Start Shopping</a>
        </div>
      } @else {
        <div class="orders-list">
          @for (order of orders; track order.id) {
            <div class="order-card">
              <div class="order-header">
                <div>
                  <h3>Order #{{order.id}}</h3>
                  <p class="order-date">{{order.createdAt | date}}</p>
                </div>
                <span class="order-status" [class]="order.status">{{order.status}}</span>
              </div>
              <div class="order-items">
                @for (item of order.items; track item.product.id) {
                  <div class="order-item">
                    <img [src]="item.product.imageUrl" [alt]="item.product.name">
                    <div class="item-details">
                      <h4>{{item.product.name}}</h4>
                      <p>Quantity: {{item.quantity}}</p>
                      <p class="item-price">\${{(item.product.price * item.quantity).toFixed(2)}}</p>
                    </div>
                  </div>
                }
              </div>
              <div class="order-footer">
                <div class="order-total">
                  <span>Total:</span>
                  <span class="total-amount">\${{order.total.toFixed(2)}}</span>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .orders-list {
      display: grid;
      gap: var(--space-4);
      padding: var(--space-4) 0;
    }
    .order-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-3);
      border-bottom: 1px solid var(--gray-light);
    }
    .order-date {
      color: var(--gray-dark);
      font-size: 0.875rem;
    }
    .order-status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .order-status.pending { background: var(--warning); color: white; }
    .order-status.processing { background: var(--primary); color: white; }
    .order-status.shipped { background: var(--success); color: white; }
    .order-status.delivered { background: var(--success); color: white; }
    .order-status.cancelled { background: var(--error); color: white; }
    .order-items {
      padding: var(--space-3);
    }
    .order-item {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: var(--space-3);
      padding: var(--space-2) 0;
      border-bottom: 1px solid var(--gray-light);
    }
    .order-item:last-child {
      border-bottom: none;
    }
    .order-item img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
    }
    .item-details h4 {
      margin: 0 0 var(--space-1);
    }
    .item-details p {
      margin: 0;
      color: var(--gray-dark);
    }
    .item-price {
      font-weight: 500;
      color: var(--black) !important;
    }
    .order-footer {
      padding: var(--space-3);
      background: var(--gray-light);
    }
    .order-total {
      display: flex;
      justify-content: space-between;
      font-weight: 500;
    }
    .total-amount {
      color: var(--primary);
      font-size: 1.1rem;
    }
    .no-orders {
      text-align: center;
      padding: var(--space-5);
    }
  `]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoading = true;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.currentUser();
    if (user) {
      this.orderService.getOrdersByUser(user.id).subscribe({
        next: (orders) => {
          this.orders = orders;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading orders', error);
          this.isLoading = false;
        }
      });
    }
  }
}