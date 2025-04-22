import { Product } from '../models/product.model';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'VitaBand Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitoring, step counter, and sleep analysis.',
    price: 49.99,
    category: 'Wearables',
    imageUrl: 'https://picsum.photos/id/1/500/500',
    stock: 150,
    rating: 4.5,
    reviews: [
      {
        id: 'r1',
        userId: '2',
        userName: 'John Doe',
        rating: 5,
        comment: 'Great fitness tracker! Battery life is impressive.',
        createdAt: new Date('2023-05-15')
      },
      {
        id: 'r2',
        userId: '3',
        userName: 'Jane Smith',
        rating: 4,
        comment: 'Good value for money. The app could be better though.',
        createdAt: new Date('2023-06-20')
      }
    ],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
    featured: true,
    tags: ['fitness', 'tracker', 'health']
  },
  {
    id: '2',
    name: 'VitaBand Sport Water Bottle',
    description: 'Insulated water bottle that keeps your drinks cold for up to 24 hours. Perfect for workouts.',
    price: 24.99,
    category: 'Accessories',
    imageUrl: 'https://picsum.photos/id/2/500/500',
    stock: 200,
    rating: 4.7,
    reviews: [
      {
        id: 'r3',
        userId: '2',
        userName: 'John Doe',
        rating: 5,
        comment: 'Amazing bottle, keeps water cold all day!',
        createdAt: new Date('2023-04-10')
      }
    ],
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-01-20'),
    tags: ['bottle', 'hydration']
  },
  {
    id: '3',
    name: 'VitaBand Running Shoes',
    description: 'Lightweight and comfortable running shoes with excellent cushioning and support.',
    price: 89.99,
    category: 'Footwear',
    imageUrl: 'https://picsum.photos/id/3/500/500',
    stock: 75,
    rating: 4.2,
    reviews: [
      {
        id: 'r4',
        userId: '3',
        userName: 'Jane Smith',
        rating: 4,
        comment: 'Very comfortable for running, but sizing runs small.',
        createdAt: new Date('2023-03-22')
      }
    ],
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-02-01'),
    featured: true,
    tags: ['shoes', 'running', 'footwear']
  },
  {
    id: '4',
    name: 'VitaBand Yoga Mat',
    description: 'Non-slip yoga mat with excellent cushioning for all types of workouts.',
    price: 29.99,
    category: 'Yoga',
    imageUrl: 'https://picsum.photos/id/4/500/500',
    stock: 100,
    rating: 4.8,
    reviews: [],
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10'),
    tags: ['yoga', 'mat', 'fitness']
  },
  {
    id: '5',
    name: 'VitaBand Protein Powder',
    description: 'High-quality whey protein powder for muscle recovery and growth. 25g protein per serving.',
    price: 34.99,
    category: 'Nutrition',
    imageUrl: 'https://picsum.photos/id/5/500/500',
    stock: 120,
    rating: 4.6,
    reviews: [],
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-15'),
    discount: 10,
    tags: ['protein', 'nutrition', 'supplement']
  },
  {
    id: '6',
    name: 'VitaBand Resistance Bands Set',
    description: 'Set of 5 resistance bands with different resistance levels for strength training.',
    price: 19.99,
    category: 'Fitness Equipment',
    imageUrl: 'https://picsum.photos/id/6/500/500',
    stock: 150,
    rating: 4.4,
    reviews: [],
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-02-20'),
    featured: true,
    tags: ['bands', 'resistance', 'training']
  },
  {
    id: '7',
    name: 'VitaBand Sports Backpack',
    description: 'Durable backpack with multiple compartments for your gym essentials.',
    price: 39.99,
    category: 'Accessories',
    imageUrl: 'https://picsum.photos/id/7/500/500',
    stock: 80,
    rating: 4.3,
    reviews: [],
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2023-03-01'),
    tags: ['backpack', 'bag', 'accessories']
  },
  {
    id: '8',
    name: 'VitaBand Performance T-Shirt',
    description: 'Moisture-wicking t-shirt for comfortable workouts. Available in multiple colors.',
    price: 24.99,
    category: 'Apparel',
    imageUrl: 'https://picsum.photos/id/8/500/500',
    stock: 200,
    rating: 4.5,
    reviews: [],
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-10'),
    discount: 15,
    tags: ['shirt', 'apparel', 'clothing']
  }
];