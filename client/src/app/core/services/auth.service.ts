import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, Subject, tap, throwError} from 'rxjs';
import { User } from '../../data/model/user.model';
import { AuthResponse } from '../../data/model/auth-response.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  currentUser$ = this.currentUserSubject.asObservable();

  private api = 'http://localhost:8080/auth';

  private refreshTimer?: ReturnType<typeof setTimeout>;
  private isRefreshing = false;
  private refreshTokenSubject = new Subject<string>();

  constructor(private http: HttpClient) {}

  private getUserFromStorage(): User | null {
    
    if (typeof localStorage === 'undefined') {
      return null;
    }

    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const user = { email, password };
    return this.http.post<AuthResponse>(`${this.api}/login`, user).pipe(
      tap((res) => this.handleAuthSuccess(res))
    );

  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<AuthResponse> {
    const user = { firstName, lastName, email, password};
    return this.http.post<AuthResponse>(`${this.api}/signup`, user).pipe(
      tap((res) => this.handleAuthSuccess(res))
    );
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
    this.currentUserSubject.next(null);
  }

  getAccessToken(): string | null {
    if (typeof localStorage !== 'undefined') 
      return localStorage.getItem('accessToken');
    return null;
  }

  deleteAccessToken() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  }

  getRefreshToken(): string | null {
    if (typeof localStorage !== 'undefined')
      return localStorage.getItem('refreshToken');
    return null;
  }

  private handleAuthSuccess(res: AuthResponse) {
    
    if (typeof localStorage !== 'undefined' && res) {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('user', JSON.stringify(res.user));

      this.currentUserSubject.next(res.user);
      // ✅ schedule auto-refresh
      this.scheduleTokenRefresh(res.accessToken);
    }
    else {
      console.error('LocalStorage is not available');
    }
  }

  refreshToken(): Observable<string> {
    
    if (this.isRefreshing) {
      return this.refreshTokenSubject.asObservable();
    }
    
    this.isRefreshing = true;
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }
    

    return this.http.post<AuthResponse>(`${this.api}/refresh`, { refreshToken }).pipe(
      map((res) => {
        this.handleAuthSuccess(res);
        this.refreshTokenSubject.next(res.accessToken);
        this.isRefreshing = false;
        return res.accessToken; // ✅ return only the token
      }),
      catchError(err => {
        this.isRefreshing = false;
        this.logout();
        return throwError(() => err);
      })
    );
  }

  private scheduleTokenRefresh(accessToken: string) {
    const decoded = jwtDecode<{ exp: number }>(accessToken);
    const expiresAt = decoded.exp * 1000; // in ms

    const now = Date.now();
    const bufferTime = 10 * 1000; // refresh 10s before expiration
    const delay = Math.max(expiresAt - now - bufferTime, 0);

    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    this.refreshTimer = setTimeout(() => {
      this.refreshToken().subscribe(); // silent background refresh
    }, delay);
  }
}
