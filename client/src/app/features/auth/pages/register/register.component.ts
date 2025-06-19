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
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.firstName, this.lastName, this.email, this.password).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
