import { User } from '../models/user.model';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@vitaband.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date('2023-01-01'),
    address: {
      street: '123 Admin St',
      city: 'Admin City',
      state: 'AS',
      postalCode: '12345',
      country: 'USA'
    },
    phone: '123-456-7890'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    createdAt: new Date('2023-02-15'),
    address: {
      street: '456 User Ave',
      city: 'User City',
      state: 'US',
      postalCode: '54321',
      country: 'USA'
    },
    phone: '987-654-3210'
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    createdAt: new Date('2023-03-20')
  }
];