import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../data/model/user.model';
import { UserService } from '../../../../core/services/user.service';
import { AuthNavbarComponent } from "../../../../shared/navbars/auth-navbar/auth-navbar.component";
import { FooterComponent } from "../../../../shared/footers/footer/footer.component";
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthModalService } from '../../../../core/services/auth-modal.service';
import { RoleBadgeComponent } from '../../../../shared/components/role-badge.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RoleBadgeComponent, CommonModule, DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  user: User | null = null;
  currentUser: User | null = null;
  userId: string = '';
  isAdminView = false;

  constructor(
    private userService: UserService, 
    private authService: AuthService, 
    private authModalService: AuthModalService,
    private router: Router,
    private route: ActivatedRoute) {
    this.user = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    

    this.currentUser = this.authService.getCurrentUser();

    this.userId = this.route.snapshot.paramMap.get('id') || this.currentUser?.userId!;

    // admin route = /admin/users/:id
    this.isAdminView = this.route.snapshot.url[0]?.path === 'users';

    if (!this.currentUser || (!this.isAdminView && this.userId !== this.currentUser.userId)) {
      this.router.navigate(['admin/unauthorized']);
      return;
    }

    this.loadProfile();
  }

  loadProfile() {
    
    this.userService.getUserProfile(this.userId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        this.authModalService.show('Failed to load profile. Please try again later.');
        console.error('Failed to load profile', err);
        this.router.navigate(['/unauthorized'])
      },
    });
  }

  logout() {
    this.authService.logout();
  }

  deleteProfile() {

    if (!this.userId) return;

    const confirmed = confirm('Are you sure you want to delete this account? This action cannot be undone.');

    if (!confirmed) return;

    this.userService.disableUserProfile(this.userId).subscribe({
      next: () => {
        if (this.isAdminView) {
          this.router.navigate(['/admin/users']);
        } else {
          this.logout(); // for self-delete
          this.router.navigate(['/auth/login']);
        }
      },
      error: (err) => {
        this.authModalService.show('Failed to delete account. Please try again later.');
        console.error('Failed to delete account', err);
      },
    });
  }

  editProfile() {
    const path = this.isAdminView
      ? `/admin/users/${this.userId}/edit`
      : `/profile/edit`;
    this.router.navigate([path]);
  }

}
