import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

  isMenuOpen = false;
  user: any = null;
  private userSub?: Subscription;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.userSub = this.auth.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  showMenu() {
    this.isMenuOpen = true;
  }

  hideMenu() {
    this.isMenuOpen = false;
  }
  
  get isAdmin(): boolean {
    return this.user?.role === 'ADMIN';
  }

  get isUser(): boolean {
    return this.user?.role === 'USER';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }
}
