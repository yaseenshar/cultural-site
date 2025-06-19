import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getAccessToken();

    const cloned = token
      ? req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        })
      : req;

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.auth.getRefreshToken()) {
          return this.auth.refreshToken().pipe(
            switchMap(() => {
              const newToken = this.auth.getAccessToken();
              const retryReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken}`)
              });
              return next.handle(retryReq);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
