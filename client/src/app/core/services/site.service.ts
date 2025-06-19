import { Injectable } from '@angular/core';
import { map, BehaviorSubject, Observable, of } from 'rxjs';
import { RawSite, Site } from '../../data/model/site.model';
import { HttpClient } from '@angular/common/http';

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
  

  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'http://localhost:8080/sites';
  private readonly apiUrlFav = 'http://localhost:8080/users';

  private favoriteIds = new Set<string>(); // 💡 track IDs only

  addfavorite(userId: string, siteId: string) : Observable<string> {
    return this.http.post(
      `${this.apiUrlFav}/${userId}/favourites/${siteId}`, 
      null, 
      {responseType: 'text'});
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
          this.favoriteIds.add(site.id); // 🔥 store the ID
          return {
            id: site.id,
            dataId: site.dataId,
            type: site.type,
            favourite: true,
            properties: JSON.parse(site.properties),
            geometry: JSON.parse(site.geometry),
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
          id: site.id,
          dataId: site.dataId,
          type: site.type,
          favourite: this.favoriteIds.has(site.id), // ✅ check from Set
          properties: JSON.parse(site.properties),
          geometry: JSON.parse(site.geometry),
        }))
      )
    );
  }

  toggleFavorite(userId: string, siteId: string): void {
    if (this.favoriteIds.has(siteId)) {
      this.deleteFavorite(userId, siteId).subscribe(() => {
          this.favoriteIds.delete(siteId);
      });

      
    } else {
      this.addfavorite(userId, siteId).subscribe(() => {
        this.favoriteIds.add(siteId);
      });
    }
  }
}
