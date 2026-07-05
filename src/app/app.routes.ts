import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // 🔗 This forces the base path to load the login page first
    loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    // Loads your corporate reference dashboard file layout component cleanly
    loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  }
];
