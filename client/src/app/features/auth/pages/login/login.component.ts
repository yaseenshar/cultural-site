import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthModalService } from '../../../../core/services/auth-modal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private authModalService: AuthModalService, private router: Router) { }

  login() {
 
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.successMessage = 'Login successful!';
        this.authModalService.show('Login successful! Redirecting to home page...');

        const user = this.authService.getCurrentUser();

        const dashboardRoute = user?.role === 'ADMIN'
        ? '/admin/users'
        : '/profile';

        this.router.navigate([dashboardRoute]);
      },
      error: err => {
        this.authModalService.show('Login failed. Please try again.');
        this.errorMessage = 'Login failed. Please try again.';
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
