import { Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
@Component({
  selector: 'app-role-badge',
  standalone: true,
  imports: [NgClass, CommonModule],
  template: `
    <span class="inline-flex items-center rounded-full px-2 py-0.5 text-md font-medium"
          [ngClass]="{
            'bg-green-100 text-green-800': role === 'USER',
            'bg-red-100 text-red-800': role === 'ADMIN'
          }">
      <ng-container *ngIf="role === 'ADMIN'">🛡️</ng-container>
      <ng-container *ngIf="role === 'USER'">🙋</ng-container>
    </span>
  `
})
export class RoleBadgeComponent {
  @Input() role: 'ADMIN' | 'USER' = 'USER';
}
