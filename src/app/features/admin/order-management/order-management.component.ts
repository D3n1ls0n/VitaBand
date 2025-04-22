import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="order-management">
      <h2>Order Management</h2>
      
      @if (isLoading) {
        <p>Loading orders...</p>
      } @else {
        <div class="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (order of orders; track order.id) {
                <tr>
                  <td>{{order.id}}</td>
                  <td>{{order.user.name}}</td>
                  <td>{{order.createdAt | date}}</td>
                  <td>\${{order.total.toFixed(2)}}</td>
                  <td>
                    <span class="status-badge" [class]="order.status">
                      {{order.status}}
                    </span>
                  </td>
                  <td>
                    <select 
                      [value]="order.status"
                      (change)="updateOrderStatus(order.id, $event)"
                      [disabled]="order.status === 'delivered' || order.status === 'cancelled'"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
  styles: [`
    .order-management {
      background: white;
      border-radius: 8px;
      padding: var(--space-4);
    }
    .orders-table {
      overflow-x: auto;
      margin-top: var(--space-4);
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: var(--space-2);
      text-align: left;
      border-bottom: 1px solid var(--gray-light);
    }
    th {
      background: var(--gray-light);
      font-weight: 500;
    }
    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    .status-badge.pending { background: var(--warning); color: white; }
    .status-badge.processing { background: var(--primary); color: white; }
    .status-badge.shipped { background: var(--success); color: white; }
    .status-badge.delivered { background: var(--success); color: white; }
    .status-badge.cancelled { background: var(--error); color: white; }
    select {
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid var(--gray);
    }
    select:disabled {
      background: var(--gray-light);
      cursor: not-allowed;
    }
  `]
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];
  isLoading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
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

  updateOrderStatus(orderId: string, event: Event) {
    const status = (event.target as HTMLSelectElement).value as Order['status'];
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: (updatedOrder) => {
        this.orders = this.orders.map(order => 
          order.id === orderId ? updatedOrder : order
        );
      },
      error: (error) => {
        console.error('Error updating order status', error);
      }
    });
  }
}