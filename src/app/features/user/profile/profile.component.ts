import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="profile-container">
        <h2>My Profile</h2>
        @if (user) {
          <div class="profile-info">
            <div class="info-group">
              <label>Name</label>
              <p>{{user.name}}</p>
            </div>
            <div class="info-group">
              <label>Email</label>
              <p>{{user.email}}</p>
            </div>
            <div class="info-group">
              <label>Member Since</label>
              <p>{{user.createdAt | date}}</p>
            </div>
            @if (user.address) {
              <div class="address-section">
                <h3>Shipping Address</h3>
                <p>{{user.address.street}}</p>
                <p>{{user.address.city}}, {{user.address.state}} {{user.address.postalCode}}</p>
                <p>{{user.address.country}}</p>
              </div>
            }
          </div>
        } @else {
          <p>Loading profile...</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 600px;
      margin: 0 auto;
      padding: var(--space-4);
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .profile-info {
      margin-top: var(--space-4);
    }
    .info-group {
      margin-bottom: var(--space-3);
    }
    .info-group label {
      color: var(--gray-dark);
      font-size: 0.875rem;
      margin-bottom: var(--space-1);
    }
    .info-group p {
      font-size: 1.1rem;
      margin: 0;
    }
    .address-section {
      margin-top: var(--space-4);
      padding-top: var(--space-3);
      border-top: 1px solid var(--gray-light);
    }
    .address-section h3 {
      margin-bottom: var(--space-2);
    }
    .address-section p {
      margin: var(--space-1) 0;
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.currentUser();
  }
}