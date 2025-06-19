import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../data/model/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  
  private readonly apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getUserProfile(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUserProfile(userId: string | undefined, updatedData: Partial<User>): Observable<any> {
    if (!userId) {
      throw new Error('User ID is required for updating profile');
    }
    return this.http.put<User>(`${this.apiUrl}/${userId}`, updatedData);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

}
