import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../data/model/user.model';
import { UserService } from '../../../../core/services/user.service';
import { AuthNavbarComponent } from "../../../../shared/navbars/auth-navbar/auth-navbar.component";
import { FooterComponent } from "../../../../shared/footers/footer/footer.component";
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FooterComponent, CommonModule, DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{


  user: User | null = null;

  constructor(private userService: UserService, private auth: AuthService, private router: Router) {
    this.user = this.auth.getCurrentUser();
  }

  ngOnInit(): void {
    
    const userId = this.user?.userId;
    if (userId) {
      this.userService.getUserProfile(userId).subscribe({
        next: (profile) => {
          this.user = profile;
        },
        error: (err) => {
          console.error('Failed to load profile', err);
        },
      });
    }
  }

  logout() {
    this.auth.logout();
  }

  editProfile() {
    this.router.navigate(['/profile/edit']);
  }
}
