import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="product-form">
      <h2>{{isEditMode ? 'Edit' : 'Create'}} Product</h2>
      
      <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Product Name</label>
          <input type="text" id="name" formControlName="name">
          @if (productForm.get('name')?.invalid && productForm.get('name')?.touched) {
            <span class="error">Product name is required</span>
          }
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" formControlName="description" rows="4"></textarea>
          @if (productForm.get('description')?.invalid && productForm.get('description')?.touched) {
            <span class="error">Description is required</span>
          }
        </div>

        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" id="price" formControlName="price" step="0.01">
          @if (productForm.get('price')?.invalid && productForm.get('price')?.touched) {
            <span class="error">Valid price is required</span>
          }
        </div>

        <div class="form-group">
          <label for="category">Category</label>
          <select id="category" formControlName="category">
            <option value="Wearables">Wearables</option>
            <option value="Fitness Equipment">Fitness Equipment</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Apparel">Apparel</option>
          </select>
        </div>

        <div class="form-group">
          <label for="imageUrl">Image URL</label>
          <input type="text" id="imageUrl" formControlName="imageUrl">
          @if (productForm.get('imageUrl')?.invalid && productForm.get('imageUrl')?.touched) {
            <span class="error">Image URL is required</span>
          }
        </div>

        <div class="form-group">
          <label for="stock">Stock</label>
          <input type="number" id="stock" formControlName="stock">
          @if (productForm.get('stock')?.invalid && productForm.get('stock')?.touched) {
            <span class="error">Stock quantity is required</span>
          }
        </div>

        <div class="form-group">
          <label for="discount">Discount (%)</label>
          <input type="number" id="discount" formControlName="discount" min="0" max="100">
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" routerLink="/admin/products">Cancel</button>
          <button type="submit" class="btn-primary" [disabled]="productForm.invalid || isSubmitting">
            {{isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .product-form {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      padding: var(--space-4);
      border-radius: 8px;
    }
    .form-group {
      margin-bottom: var(--space-3);
    }
    label {
      display: block;
      margin-bottom: var(--space-1);
      font-weight: 500;
    }
    input, select, textarea {
      width: 100%;
      padding: var(--space-2);
      border: 1px solid var(--gray);
      border-radius: 4px;
    }
    .error {
      color: var(--error);
      font-size: 0.875rem;
      margin-top: var(--space-1);
      display: block;
    }
    .form-actions {
      display: flex;
      gap: var(--space-2);
      justify-content: flex-end;
      margin-top: var(--space-4);
    }
  `]
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['Wearables', Validators.required],
      imageUrl: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getProductById(id).subscribe(product => {
        this.productForm.patchValue(product);
      });
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    this.isSubmitting = true;
    const productData = this.productForm.value;

    const request = this.isEditMode ?
      this.productService.updateProduct(this.route.snapshot.paramMap.get('id')!, productData) :
      this.productService.createProduct(productData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        console.error('Error saving product', error);
        this.isSubmitting = false;
      }
    });
  }
}