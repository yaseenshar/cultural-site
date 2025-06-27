import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit, Input } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';


import '@googlemaps/extended-component-library/api_loader.js';
import '@googlemaps/extended-component-library/route_overview.js';

import { loadGoogleMapsApi } from './google-maps-loader';

import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SiteService } from '../../../../core/services/site.service';
import { Site } from '../../../../data/model/site.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-full-map',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    GoogleMapsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './full-map.component.html',
  styleUrl: './full-map.component.scss'
})
export class FullMapComponent implements OnInit, AfterViewInit {
  title = 'Cultural Site Explorer';
  description = 'Explore cultural sites around the world with detailed information and images.';

  @Input() site: Site | null = null;

  categoryList = ['MUSEUM', 'RESTAURANT', 'ARTWORK', 'THEATRE'];
  selectedCategories: string[] = [...this.categoryList];
  searchText = '';
  showFavoritesOnly = false;

  allSites: Site[] = [];
  filteredSites: Site[] = [];
  map!: google.maps.Map;
  markerMap: Map<string, google.maps.marker.AdvancedMarkerElement> = new Map();

  center = { lat: 50.833, lng: 12.921 }; // Set default center coordinates for checmnitz 50.83316673402464, 12.921378299117935
  zoom: number = 12;

  siteList: Site[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private siteService: SiteService
  ) { }

  ngOnInit() {
    
  }

  async ngAfterViewInit() {

    if (!isPlatformBrowser(this.platformId))
      return;

    await loadGoogleMapsApi(); // 🔐 Ensures google is defined

    await this.buildMarkerViews();

    await this.loadSites();
  }

  async buildMarkerViews() {
    // Dynamically import libraries
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const center = { lat: 50.833, lng: 12.921 };
    this.map = new Map(document.getElementById("map") as HTMLElement, {
      zoom: 11,
      center,
      mapId: "4504f8b37365c3d0",
    });

    console.log('Google Maps API loaded successfully');
    
  }

  loadSites() {
    if (this.site) {
      this.allSites = [this.site];
      this.applyFilters();
    } else {
      this.siteService.getAll().subscribe((sites) => {
        this.allSites = sites;
        this.applyFilters();
      });
    }
  }

  onCategoryChange(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
    this.applyFilters();
  }

  applyFilters() {
    const query = this.searchText.toLowerCase();

    this.filteredSites = this.allSites.filter(site => {
      const matchCategory = this.selectedCategories.includes(site.category || '');
      const matchSearch = site.properties?.['name']?.toLowerCase().includes(query);
      const matchFav = this.showFavoritesOnly ? site.favourite : true;

      return matchCategory && matchSearch && matchFav;
    });

    this.updateMapMarkers();
  }

  updateMapMarkers() {

    if (!this.map) return;


    const filteredIds = new Set(this.filteredSites.map(site => site.id));

    // Remove markers for sites no longer in filteredSites
    for (const [id, marker] of this.markerMap.entries()) {
      if (!filteredIds.has(id)) {
        marker.map = null;
        this.markerMap.delete(id);
      }
    }
    
    console.log('Site List:', this.siteList.length);

    // Add markers for new filteredSites
    for (const site of this.filteredSites) {
      if (!this.markerMap.has(site.id)) {
        const content = this.buildContent(site);
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: this.map,
          content: content,
          position: { lat: site.geometry.coordinates[1], lng: site.geometry.coordinates[0] },
          title: site.properties['name'],
        });
        marker.addListener("click", () => {
          this.toggleHighlight(marker, site);
        });
        this.markerMap.set(site.id, marker);
      }
    }
    
  }

  toggleHighlight(markerView: any, site: Site) {

    const markerEl = markerView.content as HTMLElement;

    const isVisible = markerEl.classList.contains('highlight');

    markerEl.classList.toggle('highlight', !isVisible);
    markerView.zIndex = isVisible ? null : 1;

    // remove highlight from all other markers except current one
    const allMarkers = document.querySelectorAll('.property');
    allMarkers.forEach((el) => {    
      if (el !== markerEl) {
        el.classList.remove('highlight');
        (el as any).zIndex = null; // reset zIndex for other markers
      }
    });

    
  }


  buildContent(site: Site): HTMLElement {
    const category = site.category || 'UNKNOWN';
    const name = site.properties['name'] || 'Unnamed Site';
    const coords = site.geometry?.coordinates || [0, 0];

    const iconMap: Record<string, string> = {
      MUSEUM: 'fa-landmark',
      THEATRE: 'fa-masks-theater',
      RESTAURANT: 'fa-utensils',
      ARTWORK: 'fa-paintbrush',
      UNKNOWN: 'fa-map-marker-alt'
    };

    const iconClass = iconMap[category] || iconMap['UNKNOWN'];

    const content = document.createElement("div");
    content.classList.add("property");
    content.innerHTML = `
    <div class="icon">
      <i class="fas ${iconClass}" title="${category}"></i>
      <span class="fa-sr-only">${name}</span>
    </div>
    <div class="details">
      <div class="font-bold text-base mb-1">${name}</div>
      <div class="text-xs text-gray-600">Lat: ${coords[1].toFixed(5)}, Lng: ${coords[0].toFixed(5)}</div>
      <div class="text-xs mt-1">Category: ${category}</div>
    </div>
  `;
    return content;
  }

  resetFilters() {
    this.searchText = '';
    this.selectedCategories = [...this.categoryList];
    this.showFavoritesOnly = false;
    this.applyFilters();
  }
}
