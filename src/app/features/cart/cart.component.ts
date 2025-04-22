import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Shopping Cart</h2>
      @if (cartService.cart().items.length === 0) {
        <div class="empty-cart">
          <p>Your cart is empty</p>
          <a routerLink="/products" class="btn-primary">Continue Shopping</a>
        </div>
      } @else {
        <div class="cart-items">
          @for (item of cartService.cart().items; track item.product.id) {
            <div class="cart-item">
              <img [src]="item.product.imageUrl" [alt]="item.product.name">
              <div class="item-details">
                <h3>{{item.product.name}}</h3>
                <p class="price">\${{item.product.price.toFixed(2)}}</p>
                <div class="quantity">
                  <button (click)="updateQuantity(item.product.id, item.quantity - 1)">-</button>
                  <span>{{item.quantity}}</span>
                  <button (click)="updateQuantity(item.product.id, item.quantity + 1)">+</button>
                </div>
              </div>
              <button class="remove-btn" (click)="removeItem(item.product.id)">Remove</button>
            </div>
          }
        </div>
        <div class="cart-summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>\${{cartService.cart().subtotal.toFixed(2)}}</span>
          </div>
          <div class="summary-row">
            <span>Tax:</span>
            <span>\${{cartService.cart().taxes.toFixed(2)}}</span>
          </div>
          <div class="summary-row">
            <span>Shipping:</span>
            <span>\${{cartService.cart().shipping.toFixed(2)}}</span>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>\${{cartService.cart().total.toFixed(2)}}</span>
          </div>
          <button class="btn-primary checkout-btn" routerLink="/checkout">
            Proceed to Checkout
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .cart-items {
      margin-bottom: var(--space-4);
    }
    .cart-item {
      display: grid;
      grid-template-columns: 100px 1fr auto;
      gap: var(--space-3);
      padding: var(--space-3);
      background: white;
      margin-bottom: var(--space-2);
      border-radius: 8px;
      align-items: center;
    }
    .cart-item img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 4px;
    }
    .quantity {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
    .quantity button {
      padding: 4px 8px;
    }
    .cart-summary {
      background: white;
      padding: var(--space-3);
      border-radius: 8px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-2);
    }
    .total {
      font-weight: bold;
      font-size: 1.2em;
      border-top: 1px solid var(--gray-light);
      padding-top: var(--space-2);
    }
    .checkout-btn {
      width: 100%;
      margin-top: var(--space-3);
    }
    .empty-cart {
      text-align: center;
      padding: var(--space-5);
    }
  `]
})
export class CartComponent {
  constructor(public cartService: CartService) {}

  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }
}