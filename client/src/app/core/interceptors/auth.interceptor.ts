import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthModalService } from '../services/auth-modal.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private authModalService:AuthModalService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.auth.getAccessToken();

    let cloned = req;
    if (accessToken) {
      cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      });
    }

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.auth.getRefreshToken()) {
          this.auth.deleteAccessToken();
          return this.auth.refreshToken().pipe(
            switchMap((newAccessToken) => {
              const retryReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newAccessToken}`)
              });
              return next.handle(retryReq);
            }),
            catchError(() => {
              // 🔥 On refresh failure
              this.auth.logout();
              this.authModalService.show('Session expired. Please log in again.');
              this.router.navigate(['/auth/login']);
              return throwError(() => new Error('Session expired. Please log in again.'));
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
