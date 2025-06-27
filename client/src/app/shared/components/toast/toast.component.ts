import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="text" class="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-md animate-fade">
      {{ text }}
    </div>
  `,
  styles: [`
    @keyframes fade {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fade {
      animation: fade 0.3s ease-out;
    }
  `]
})
export class ToastComponent {
  @Input() text: string = '';
}
