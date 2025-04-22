import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Checkout</h2>
      <div class="checkout-grid">
        <div class="order-summary">
          <h3>Order Summary</h3>
          @for (item of cartService.cart().items; track item.product.id) {
            <div class="order-item">
              <span>{{item.product.name}} x {{item.quantity}}</span>
              <span>\${{(item.product.price * item.quantity).toFixed(2)}}</span>
            </div>
          }
          <div class="total">
            <span>Total:</span>
            <span>\${{cartService.cart().total.toFixed(2)}}</span>
          </div>
        </div>
        <div class="payment-section">
          <h3>Payment Details</h3>
          <p>Payment functionality will be implemented later</p>
          <button class="btn-primary">Complete Purchase</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-4);
      padding: var(--space-4) 0;
    }
    @media (min-width: 768px) {
      .checkout-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    .order-summary, .payment-section {
      background: white;
      padding: var(--space-3);
      border-radius: 8px;
    }
    .order-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-2);
    }
    .total {
      border-top: 1px solid var(--gray-light);
      margin-top: var(--space-3);
      padding-top: var(--space-3);
      font-weight: bold;
      display: flex;
      justify-content: space-between;
    }
  `]
})
export class CheckoutComponent {
  constructor(public cartService: CartService) {}
}