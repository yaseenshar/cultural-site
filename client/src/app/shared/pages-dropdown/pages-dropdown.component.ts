import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pages-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pages-dropdown.component.html',
  styleUrl: './pages-dropdown.component.scss'
})
export class PagesDropdownComponent implements OnInit{
  dropdownPopoverShow = false;
  ngOnInit() {}

  
}
