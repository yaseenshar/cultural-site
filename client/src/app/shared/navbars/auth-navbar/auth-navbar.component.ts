import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagesDropdownComponent } from "../../pages-dropdown/pages-dropdown.component";

@Component({
  selector: 'app-auth-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, PagesDropdownComponent],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.scss'
})
export class AuthNavbarComponent implements OnInit {
  
  navbarOpen = false;
  
  constructor() { }

  ngOnInit(): void {
    
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

  
}
