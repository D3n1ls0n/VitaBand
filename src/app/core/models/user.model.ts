export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Optional as we don't always want to expose this
  role: 'admin' | 'user';
  createdAt: Date;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}