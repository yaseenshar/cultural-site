import { Routes } from '@angular/router';

export default [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'register',
        loadComponent: () =>
            import('../features/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'login',
        loadComponent: () =>
            import('../features/register/register.component').then(m => m.RegisterComponent),
    }
] satisfies Routes;
