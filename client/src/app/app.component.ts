
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from './material';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footers/footer/footer.component';
import { AuthModalService } from './core/services/auth-modal.service';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    GoogleMapsModule,
    FormsModule,
    ToastComponent,
    ...MATERIAL_IMPORTS
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Cultural Site Explorer';
  description = 'Explore cultural sites around the world with detailed information and images.';

  message: string | null = null;

  constructor(private authModalService: AuthModalService) {}

  ngOnInit() {
    this.authModalService.message$.subscribe(msg => {
      this.message = msg;

      if (msg) {
        setTimeout(() => this.authModalService.clear(), 5000); // auto-hide after 5s
      }
    });
  }

}
