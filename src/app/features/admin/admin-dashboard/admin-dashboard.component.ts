import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-container">
      <aside class="admin-sidebar">
        <nav>
          <a routerLink="/admin/products" routerLinkActive="active">Products</a>
          <a routerLink="/admin/orders" routerLinkActive="active">Orders</a>
          <a routerLink="/admin/users" routerLinkActive="active">Users</a>
        </nav>
      </aside>
      <main class="admin-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-container {
      display: grid;
      grid-template-columns: 200px 1fr;
      min-height: calc(100vh - 64px);
    }
    .admin-sidebar {
      background: white;
      border-right: 1px solid var(--gray-light);
      padding: var(--space-3);
    }
    .admin-sidebar nav {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
    .admin-sidebar a {
      padding: var(--space-2);
      border-radius: 4px;
      color: var(--black);
      text-decoration: none;
      transition: all 0.3s ease;
    }
    .admin-sidebar a:hover {
      background: var(--gray-light);
    }
    .admin-sidebar a.active {
      background: var(--primary);
      color: white;
    }
    .admin-content {
      padding: var(--space-4);
    }
  `]
})
export class AdminDashboardComponent {}