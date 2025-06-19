import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.auth.login(this.email, this.password).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
