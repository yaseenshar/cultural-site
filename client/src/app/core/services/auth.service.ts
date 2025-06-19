import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap} from 'rxjs';
import { User } from '../../data/model/user.model';
import { AuthResponse } from '../../data/model/auth-response.model';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  currentUser$ = this.currentUserSubject.asObservable();

  private api = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  private getUserFromStorage(): User | null {
    
    if (typeof localStorage === 'undefined') {
      return null;
    }

    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const user = { email, password };
    return this.http.post<AuthResponse>(`${this.api}/login`, user).pipe(
      tap((res) => this.handleAuthSuccess(res))
    );

  }

  register(email: string, password: string): Observable<AuthResponse> {
    const user = { id: '2', email, name: 'New User' };
    return this.http.post<AuthResponse>(`${this.api}/register`, user).pipe(
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

  getRefreshToken(): string | null {
    if (typeof localStorage !== 'undefined')
      return localStorage.getItem('refreshToken');
    return null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private handleAuthSuccess(res: AuthResponse) {
    
    if (typeof localStorage !== 'undefined' && res) {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('user', JSON.stringify(res.user));
    }
    
    this.currentUserSubject.next(res.user);
  }

  refreshToken(): Observable<{ accessToken: string }> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<{ accessToken: string }>(`${this.api}/refresh`, { refreshToken }).pipe(
      tap((res) => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('accessToken', res.accessToken);
        }
      })
    );
  }
}
