import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      @if (product) {
        <div class="product-detail">
          <div class="product-image">
            <img [src]="product.imageUrl" [alt]="product.name">
          </div>
          <div class="product-info">
            <h1>{{product.name}}</h1>
            <p class="description">{{product.description}}</p>
            <div class="price">
              @if (product.discount) {
                <span class="original-price">\${{product.price.toFixed(2)}}</span>
                <span class="discount-price">\${{(product.price * (1 - product.discount / 100)).toFixed(2)}}</span>
              } @else {
                <span class="current-price">\${{product.price.toFixed(2)}}</span>
              }
            </div>
            <div class="stock">
              <span>In Stock: {{product.stock}}</span>
            </div>
            <button class="btn-primary" (click)="addToCart()" [disabled]="product.stock === 0">
              Add to Cart
            </button>
          </div>
        </div>
      } @else {
        <p>Loading...</p>
      }
    </div>
  `,
  styles: [`
    .product-detail {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-4);
      padding: var(--space-4) 0;
    }
    @media (min-width: 768px) {
      .product-detail {
        grid-template-columns: 1fr 1fr;
      }
    }
    .product-image img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
    .product-info {
      padding: var(--space-3);
    }
    .price {
      font-size: 1.5rem;
      margin: var(--space-3) 0;
    }
    .original-price {
      text-decoration: line-through;
      color: var(--gray);
      margin-right: var(--space-2);
    }
    .discount-price {
      color: var(--accent);
    }
    .stock {
      margin-bottom: var(--space-3);
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe(product => {
        this.product = product;
      });
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, 1);
    }
  }
}