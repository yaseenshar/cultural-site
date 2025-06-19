import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { SiteData, SiteService } from '../../../../core/services/site.service';
import { FormsModule } from '@angular/forms';
import { Site } from '../../../../data/model/site.model';
import { User } from '../../../../data/model/user.model';
import { AuthService } from '../../../../core/services/auth.service';
import { FooterComponent } from '../../../../shared/footers/footer/footer.component';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.scss'
})
export class SiteListComponent implements OnInit {

  sites: SiteData[] = [];
  siteList: Site[] = [];
  favSiteList: Site[] = [];
  selectedCategory = '';
  categories = ['Museum', 'Historic', 'Modern'];

  page = 1;
  pageSize = 5;
  Math = Math;
  isDropdownOpen = false;
  filterStatus: 'ALL' | 'Favourite' | 'Favourite' = 'ALL';
  searchText = '';

  user: User | null = null;

  constructor(private authService: AuthService, private siteService: SiteService) {
    this.user = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.loadfavSites();
  }

  loadfavSites() {
    
    const userId = this.user?.userId;
    if (!userId) {
      console.warn('User ID is not available');
      return;
    }

    this.siteService.getFavorites(userId).subscribe(rawSites => {
      this.favSiteList = rawSites;
      this.loadSites();
    });

    
  }

  loadSites() {
    this.siteService.getAll().subscribe(rawSites => {
      this.siteList = rawSites;
    });
  }

  toggleFavorite(siteId: string) {
    const userId = this.user?.userId;
    if (!userId) {
      console.warn('User ID is not available');
      return;
    }
    this.siteService.toggleFavorite(userId, siteId);
    this.loadSites();
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.loadSites();
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  setStatusFilter(status: 'ALL' | 'Favourite') {
    this.filterStatus = status;
    this.isDropdownOpen = false; // close after selection
  }

  get totalPages(): number {
    return Math.ceil(this.filteredSitesUnpaged.length / this.pageSize);
  }

  get paginatedSites() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredSitesUnpaged.slice(start, end);
  }

  get filteredSitesUnpaged() {
    return this.siteList.filter(site => {
      const matchesSearch =
        this.searchText === '' ||
        site.properties['name']?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        site.properties['description']?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        site.properties['category']?.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.filterStatus === 'ALL' || site.favourite;

      return matchesSearch && matchesStatus;
    });
  }

  setPage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
    }
  }

}
