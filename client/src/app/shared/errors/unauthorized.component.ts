import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: `
    <div class="p-10 text-center text-red-600 text-xl font-bold">
      🚫 Unauthorized access
    </div>
  `
})
export class UnauthorizedComponent {}
