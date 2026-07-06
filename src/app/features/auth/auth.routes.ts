import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    // 🚀 تصحيح مسار الصعود والنزول ليتجه إلى pages/login/login.component بالملي
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  }
];
