import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Product, ProductFilter } from '../models/product.model';
import { MOCK_PRODUCTS } from '../data/mock-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = MOCK_PRODUCTS;

  constructor() {}

  getAllProducts(filter?: ProductFilter): Observable<Product[]> {
    let filteredProducts = [...this.products];

    // Apply filters if provided
    if (filter) {
      if (filter.category) {
        filteredProducts = filteredProducts.filter(p => p.category === filter.category);
      }

      if (filter.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filter.minPrice!);
      }

      if (filter.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filter.maxPrice!);
      }

      if (filter.search) {
        const searchTerm = filter.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchTerm) || 
          p.description.toLowerCase().includes(searchTerm)
        );
      }

      // Apply sorting
      if (filter.sortBy) {
        filteredProducts.sort((a, b) => {
          let comparison = 0;
          
          switch (filter.sortBy) {
            case 'price':
              comparison = a.price - b.price;
              break;
            case 'rating':
              comparison = a.rating - b.rating;
              break;
            case 'name':
              comparison = a.name.localeCompare(b.name);
              break;
          }
          
          return filter.sortDirection === 'desc' ? -comparison : comparison;
        });
      }
    }

    return of(filteredProducts).pipe(delay(300)); // Simulate network delay
  }

  getProductById(id: string): Observable<Product> {
    const product = this.products.find(p => p.id === id);
    
    if (product) {
      return of(product).pipe(delay(300)); // Simulate network delay
    }
    
    return throwError(() => new Error('Product not found'));
  }

  getFeaturedProducts(): Observable<Product[]> {
    const featuredProducts = this.products.filter(p => p.featured);
    return of(featuredProducts).pipe(delay(300)); // Simulate network delay
  }

  getProductCategories(): Observable<string[]> {
    const categories = [...new Set(this.products.map(p => p.category))];
    return of(categories).pipe(delay(300)); // Simulate network delay
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: 'product-' + Math.random().toString(36).substr(2),
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.products.push(newProduct);
    return of(newProduct).pipe(delay(500)); // Simulate network delay
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    const index = this.products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return throwError(() => new Error('Product not found'));
    }
    
    const updatedProduct = {
      ...this.products[index],
      ...product,
      updatedAt: new Date()
    };
    
    this.products[index] = updatedProduct;
    return of(updatedProduct).pipe(delay(500)); // Simulate network delay
  }

  deleteProduct(id: string): Observable<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return throwError(() => new Error('Product not found'));
    }
    
    this.products.splice(index, 1);
    return of(true).pipe(delay(500)); // Simulate network delay
  }
}