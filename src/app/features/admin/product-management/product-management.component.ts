import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="product-management">
      <div class="header">
        <h2>Product Management</h2>
        <a routerLink="/admin/products/create" class="btn-primary">Add New Product</a>
      </div>
      
      @if (isLoading) {
        <p>Loading products...</p>
      } @else {
        <div class="products-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (product of products; track product.id) {
                <tr>
                  <td>
                    <img [src]="product.imageUrl" [alt]="product.name">
                  </td>
                  <td>{{product.name}}</td>
                  <td>\${{product.price.toFixed(2)}}</td>
                  <td>{{product.stock}}</td>
                  <td>{{product.category}}</td>
                  <td>
                    <div class="actions">
                      <a [routerLink]="['/admin/products/edit', product.id]" class="btn-primary">Edit</a>
                      <button class="btn-error" (click)="deleteProduct(product.id)">Delete</button>
                    </div>
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
    .product-management {
      background: white;
      border-radius: 8px;
      padding: var(--space-4);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-4);
    }
    .products-table {
      overflow-x: auto;
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
    td img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
    }
    .actions {
      display: flex;
      gap: var(--space-2);
    }
    .btn-error {
      background: var(--error);
      color: white;
    }
    .btn-error:hover {
      background: var(--error-dark);
    }
  `]
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products', error);
        this.isLoading = false;
      }
    });
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
        },
        error: (error) => {
          console.error('Error deleting product', error);
        }
      });
    }
  }
}