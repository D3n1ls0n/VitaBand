import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';
import { MOCK_USERS } from '../data/mock-users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  // Use signal for reactive user state management
  private currentUserSignal = signal<User | null>(null);
  currentUser = this.currentUserSignal.asReadonly();
  
  // Subject for auth state changes
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {}

  initAuthState(): void {
    const storedUser = localStorage.getItem(this.USER_KEY);
    const token = localStorage.getItem(this.TOKEN_KEY);
    
    if (storedUser && token) {
      this.currentUserSignal.set(JSON.parse(storedUser));
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    // Simulate API call with mock data
    const user = MOCK_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      // Create a copy without password for storage
      const { password, ...safeUser } = user;
      const authResponse: AuthResponse = {
        user: safeUser as User,
        token: 'mock-jwt-token-' + Math.random().toString(36).substr(2)
      };

      return of(authResponse).pipe(
        delay(800), // Simulate network delay
        tap(response => this.handleAuthSuccess(response))
      );
    }

    return throwError(() => new Error('Invalid email or password'));
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === userData.email)) {
      return throwError(() => new Error('Email already in use'));
    }

    // Create new user with 'user' role
    const newUser: User = {
      id: 'user-' + Math.random().toString(36).substr(2),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'user',
      createdAt: new Date()
    };

    // Add to mock data (in a real app, this would be an API call)
    MOCK_USERS.push(newUser);

    // Create a copy without password for storage
    const { password, ...safeUser } = newUser;
    const authResponse: AuthResponse = {
      user: safeUser as User,
      token: 'mock-jwt-token-' + Math.random().toString(36).substr(2)
    };

    return of(authResponse).pipe(
      delay(800), // Simulate network delay
      tap(response => this.handleAuthSuccess(response))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSignal.set(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.currentUser() ? this.currentUser()!.role === 'admin' : false;
  }

  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    this.currentUserSignal.set(response.user);
    this.isAuthenticatedSubject.next(true);
  }
}