import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="text-center py-20">
      <h1 class="text-6xl font-bold text-gray-800">404</h1>
      <p class="text-xl mt-4 text-gray-600">Page not found</p>
      <a routerLink="/home" class="text-indigo-600 hover:underline mt-4 inline-block">Go to Home</a>
    </div>
  `
})
export class NotFoundComponent {}
