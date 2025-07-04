import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { SiteData, SiteService } from '../../../../core/services/site.service';
import { FormsModule } from '@angular/forms';
import { Site, SITE_CATEGORIES, SiteCategory } from '../../../../data/model/site.model';
import { User } from '../../../../data/model/user.model';
import { AuthService } from '../../../../core/services/auth.service';

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
  pageSize = 10;
  Math = Math;
  isDropdownOpen = false;
  filterStatus: 'ALL' | 'Favourite' | 'Favourite' = 'ALL';
  searchText = '';

  allCategories: (SiteCategory | 'ALL')[] = [];

  user: User | null = null;

  constructor(private authService: AuthService, private siteService: SiteService) {
    this.user = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.allCategories = ['ALL', ...SITE_CATEGORIES]; // ✅ spread here, not in template

    this.loadGroupedSites();
  }

  toggleFavorite(site: Site) {
    const userId = this.user?.userId;
    if (!userId) {
      console.warn('User ID is not available');
      return;
    }

    this.siteService.toggleFavorite(userId, site.siteId).subscribe({
      next: (newStatus) => site.favourite = newStatus,
      error: () => site.favourite = !site.favourite // rollback
    });
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


  groupedSites: Record<SiteCategory, Site[]> = {
    MUSEUM: [],
    RESTAURANT: [],
    ARTWORK: [],
    THEATRE: []
  };

  loadGroupedSites() {
    this.siteService.getGroupedSites().subscribe(grouped => {
      this.groupedSites = grouped;
      this.siteList = this.flattenSites(); // Load all
    });
  }

  filterByCategory(category: SiteCategory) {
    this.selectedCategory = category;
    this.siteList = this.groupedSites[category];
  }

  flattenSites(): Site[] {
    return Object.values(this.groupedSites).flat();
  }
}
