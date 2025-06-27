import { Injectable } from '@angular/core';
import { map, BehaviorSubject, Observable, of, tap, mapTo } from 'rxjs';
import { GroupedSites, RawSite, Site, SiteCategory } from '../../data/model/site.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../../data/model/user.model';

export interface SiteData {
  id: string;
  name: string;
  description: string;
  category: string;
  lat: number;
  lng: number;
  isFavorite?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SiteService {

  private readonly apiUrl = 'http://localhost:8080/sites';
  private readonly apiUrlFav = 'http://localhost:8080/users';

  public readonly favoriteIds = new Set<string>();

  user: User | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
    const userId = this.user?.userId;

    if (!userId) {
      console.warn('User ID is not available');
      return;
    }

    this.getFavorites(userId).subscribe(favorites => {
      favorites.forEach(site => this.favoriteIds.add(site.siteId)); // Populate Set with initial favorites
    });
  }

  addfavorite(userId: string, siteId: string): Observable<string> {
    return this.http.post(
      `${this.apiUrlFav}/${userId}/favourites/${siteId}`,
      null,
      { responseType: 'text' }
    );
  }

  deleteFavorite(userId: string, siteId: string): Observable<any> {
    return this.http.delete(`${this.apiUrlFav}/${userId}/favourites/${siteId}`,
      { responseType: 'text' }
    );
  }

  getFavorites(userId: string): Observable<Site[]> {
    return this.http.get<RawSite[]>(`${this.apiUrlFav}/${userId}/favourites`).pipe(
      map(rawSites => {
        this.favoriteIds.clear(); // reset before assigning new
        const parsedSites = rawSites.map(site => {
          this.favoriteIds.add(site.siteId); // 🔥 store the ID
          return {
            siteId: site.siteId,
            id: site.id,
            type: site.type,
            favourite: true,
            properties: site.properties,
            geometry: site.geometry,
          };
        });
        return parsedSites;
      })
    );
  }


  getAll(): Observable<Site[]> {
    return this.http.get<RawSite[]>(this.apiUrl).pipe(
      map(rawSites =>
        rawSites.map(site => ({
          siteId: site.siteId,
          id: site.id,
          type: site.type,
          category: site.category as SiteCategory,
          favourite: this.favoriteIds.has(site.siteId), // ✅ check from Set
          properties: site.properties,
          geometry: site.geometry,
        }))
      )
    );
  }

  toggleFavorite(userId: string, siteId: string): Observable<boolean> {
    if (this.favoriteIds.has(siteId)) {
      return this.deleteFavorite(userId, siteId).pipe(
        tap(() => this.favoriteIds.delete(siteId)),
        map(() => false)
      );
    } else {
      return this.addfavorite(userId, siteId).pipe(
        tap(() => this.favoriteIds.add(siteId)),
        map(() => true)
      );
    }
  }

  getSiteById(siteId: string): Observable<Site | null> {
    return this.http.get<RawSite>(`${this.apiUrl}/${siteId}`).pipe(
      map(rawSite => {
        if (!rawSite) return null;
        return {
          siteId: rawSite.siteId,
          id: rawSite.id,
          type: rawSite.type,
          category: rawSite.category as SiteCategory,
          favourite: this.favoriteIds.has(rawSite.siteId),
          properties: typeof rawSite.properties === 'string' ? JSON.parse(rawSite.properties) : rawSite.properties,
          geometry: typeof rawSite.geometry === 'string' ? JSON.parse(rawSite.geometry) : rawSite.geometry,
        };
      })
    );
  }

  getGroupedSites(): Observable<Record<SiteCategory, Site[]>> {
    return this.http.get<Record<SiteCategory, RawSite[]>>(`${this.apiUrl}/grouped`).pipe(
      map(groupedRaw => {
        const result: Record<SiteCategory, Site[]> = {
          MUSEUM: [],
          ARTWORK: [],
          RESTAURANT: [],
          THEATRE: [],
        };

        const knownCategories: SiteCategory[] = ['MUSEUM', 'RESTAURANT', 'ARTWORK', 'THEATRE'];

        (Object.keys(groupedRaw) as string[]).forEach((key: string) => {
          if (!knownCategories.includes(key as SiteCategory)) return;
          const category = key as SiteCategory;
          result[category] = groupedRaw[category].map((site: RawSite): Site => ({
            siteId: site.siteId,
            id: site.id,
            type: site.type,
            favourite: this.favoriteIds.has(site.siteId),
            category: category,
            properties: typeof site.properties === 'string' ? JSON.parse(site.properties) : site.properties,
            geometry: typeof site.geometry === 'string' ? JSON.parse(site.geometry) : site.geometry,
          }));
        });

        return result;
      })
    );
  }

  getSitesByCategory(category: SiteCategory): Observable<Site[]> {
    return this.http.get<RawSite[]>(`${this.apiUrl}/category/${category}`).pipe(
      map(sites =>
        sites.map(site => ({
          siteId: site.siteId,
          id: site.id,
          type: site.type,
          category,
          favourite: this.favoriteIds.has(site.siteId),
          properties: JSON.parse(site.properties),
          geometry: JSON.parse(site.geometry),
        }))
      )
    );
  }

}
