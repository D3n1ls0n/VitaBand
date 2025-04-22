import { Order } from '../models/order.model';

export const MOCK_ORDERS: Order[] = [
  {
    id: 'order1',
    user: {
      id: '2',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      createdAt: new Date('2023-02-15')
    },
    items: [
      {
        product: {
          id: '1',
          name: 'VitaBand Fitness Tracker',
          description: 'Advanced fitness tracker with heart rate monitoring.',
          price: 49.99,
          category: 'Wearables',
          imageUrl: 'https://picsum.photos/id/1/500/500',
          stock: 150,
          rating: 4.5,
          reviews: [],
          createdAt: new Date('2023-01-15'),
          updatedAt: new Date('2023-01-15')
        },
        quantity: 1
      },
      {
        product: {
          id: '2',
          name: 'VitaBand Sport Water Bottle',
          description: 'Insulated water bottle that keeps your drinks cold.',
          price: 24.99,
          category: 'Accessories',
          imageUrl: 'https://picsum.photos/id/2/500/500',
          stock: 200,
          rating: 4.7,
          reviews: [],
          createdAt: new Date('2023-01-20'),
          updatedAt: new Date('2023-01-20')
        },
        quantity: 2
      }
    ],
    subtotal: 99.97,
    taxes: 7.00,
    shipping: 5.99,
    total: 112.96,
    status: 'delivered',
    paymentMethod: 'creditCard',
    paymentStatus: 'paid',
    shippingAddress: {
      street: '456 User Ave',
      city: 'User City',
      state: 'US',
      postalCode: '54321',
      country: 'USA'
    },
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-05-15')
  },
  {
    id: 'order2',
    user: {
      id: '3',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      createdAt: new Date('2023-03-20')
    },
    items: [
      {
        product: {
          id: '3',
          name: 'VitaBand Running Shoes',
          description: 'Lightweight and comfortable running shoes.',
          price: 89.99,
          category: 'Footwear',
          imageUrl: 'https://picsum.photos/id/3/500/500',
          stock: 75,
          rating: 4.2,
          reviews: [],
          createdAt: new Date('2023-02-01'),
          updatedAt: new Date('2023-02-01')
        },
        quantity: 1
      }
    ],
    subtotal: 89.99,
    taxes: 6.30,
    shipping: 5.99,
    total: 102.28,
    status: 'shipped',
    paymentMethod: 'paypal',
    paymentStatus: 'paid',
    shippingAddress: {
      street: '789 Smith St',
      city: 'Smith City',
      state: 'SS',
      postalCode: '98765',
      country: 'USA'
    },
    createdAt: new Date('2023-06-05'),
    updatedAt: new Date('2023-06-07')
  }
];