import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  errorMessage = '';
  successMessage = '';

  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  register() {
    this.errorMessage = '';
    this.successMessage = '';

    this.auth.register(this.firstName, this.lastName, this.email, this.password).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Registration failed:', err);

        if (typeof err === 'string') {
          this.errorMessage = err;
        } else if (err.error instanceof ProgressEvent) {
          this.errorMessage = 'Server is not responding.';
        } else {
          this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        }
      }
    });
  }
}
