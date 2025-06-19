

//import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

//import { routes as authRoutes } from './auth/auth.routes';

/*export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration()]
};*/


import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      /* {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.routes').then((m) => m.default),
      }, */
      {
        path: '',
        loadChildren: () =>
          import('./app-routing.module').then((m) => m.routes),
      },
    ]),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};