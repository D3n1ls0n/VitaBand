import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  isLoading = true;
  math = Math;

  constructor(private productService: ProductService) {}


  slides = [
    {
      title: 'Elevate Your Performance',
      description: 'Discover premium sports products designed to help you achieve your fitness goals.',
    },
    {
      title: 'Achieve Your Best',
      description: 'Stay on top with the best gear and expert advice.',
    },
    {
      title: 'Unleash Your Potential',
      description: 'Gear up with high-quality products tailored for serious athletes.',
    }
  ];
  
  currentSlideIndex = 0;
  translateX = '0%';


  ngOnInit(): void {
    this.loadFeaturedProducts();
     // Iniciar o carrossel automaticamente
     setInterval(() => this.moveSlide(1), 5000); // Troca de slide a cada 5 segundos
  }


  moveSlide(direction: number) {
    this.currentSlideIndex += direction;

    if (this.currentSlideIndex < 0) {
      this.currentSlideIndex = this.slides.length - 1; // Vai para o último slide
    } else if (this.currentSlideIndex >= this.slides.length) {
      this.currentSlideIndex = 0; // Volta para o primeiro slide
    }

    this.translateX = `-${this.currentSlideIndex * 100}%`; // Muda a posição do carrossel
  }
  

  loadFeaturedProducts(): void {
    this.productService.getFeaturedProducts().subscribe({
      next: (products) => {
        this.featuredProducts = products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading featured products', error);
        this.isLoading = false;
      }
    });
  }
}