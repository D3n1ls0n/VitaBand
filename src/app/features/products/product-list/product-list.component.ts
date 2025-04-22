import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Our Products</h2>
      <div class="products-grid">
        @for (product of products; track product.id) {
          <div class="product-card">
            <div class="product-image">
              <img [src]="product.imageUrl" [alt]="product.name">
              @if (product.discount) {
                <span class="discount-badge">-{{product.discount}}%</span>
              }
            </div>
            <div class="product-info">
              <h3>{{product.name}}</h3>
              <p>{{product.description}}</p>
              <div class="product-price">
                @if (product.discount) {
                  <span class="original-price">\${{product.price.toFixed(2)}}</span>
                  <span class="discount-price">\${{(product.price * (1 - product.discount / 100)).toFixed(2)}}</span>
                } @else {
                  <span>\${{product.price.toFixed(2)}}</span>
                }
              </div>
              <button class="btn-primary" [routerLink]="['/products', product.id]">View Details</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: var(--space-4);
      padding: var(--space-4) 0;
    }
    .product-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .product-image {
      position: relative;
      height: 200px;
    }
    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .product-info {
      padding: var(--space-3);
    }
    .discount-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: var(--accent);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }
}