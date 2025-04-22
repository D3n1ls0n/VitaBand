import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MOCK_USERS } from '../../../core/data/mock-users';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-management">
      <h2>User Management</h2>
      
      <div class="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Join Date</th>
            </tr>
          </thead>
          <tbody>
            @for (user of users; track user.id) {
              <tr>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>
                  <span class="role-badge" [class]="user.role">
                    {{user.role}}
                  </span>
                </td>
                <td>{{user.createdAt | date}}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .user-management {
      background: white;
      border-radius: 8px;
      padding: var(--space-4);
    }
    .users-table {
      overflow-x: auto;
      margin-top: var(--space-4);
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: var(--space-2);
      text-align: left;
      border-bottom: 1px solid var(--gray-light);
    }
    th {
      background: var(--gray-light);
      font-weight: 500;
    }
    .role-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    .role-badge.admin {
      background: var(--primary);
      color: white;
    }
    .role-badge.user {
      background: var(--gray);
      color: white;
    }
  `]
})
export class UserManagementComponent {
  users = MOCK_USERS;
}