import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../data/model/user.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {


  page = 1;
  pageSize = 10;
  Math = Math;
  isDropdownOpen = false;
  filterStatus: 'ALL' | 'ACTIVE' | 'INACTIVE' = 'ALL';
  searchText = '';
  userList: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    // Load users from the service if needed
    this.userService.getAllUsers().subscribe(users => {
      this.userList = users;
    });
  }

  get filteredUsers() {
    return this.userList.filter(user => {
      const matchesSearch =
        this.searchText === '' ||
        user.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.firstName.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.filterStatus === 'ALL' || user.status === this.filterStatus;

      return matchesSearch && matchesStatus;
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  setStatusFilter(status: 'ALL' | 'ACTIVE' | 'INACTIVE') {
    this.filterStatus = status;
    this.isDropdownOpen = false; // close after selection
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsersUnpaged.length / this.pageSize);
  }

  get paginatedUsers() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredUsersUnpaged.slice(start, end);
  }

  get filteredUsersUnpaged() {
    return this.userList.filter(user => {
      const matchesSearch =
        this.searchText === '' ||
        user.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.firstName.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.filterStatus === 'ALL' || user.status === this.filterStatus;

      return matchesSearch && matchesStatus;
    });
  }

  setPage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
    }
  }

}
