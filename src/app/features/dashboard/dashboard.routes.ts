import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    // 🚀 تصحيح المسار: الدخول مباشرة إلى مجلد pages لفتح الـ dashboard.component
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(component => component.DashboardComponent)
  }
];
