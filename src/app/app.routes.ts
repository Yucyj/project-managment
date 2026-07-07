import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(routes => routes.AUTH_ROUTES)
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component')
        .then(component => component.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        // 🚀 العودة للمسار الفرعي المعتمد لإنهاء تضارب الـ Schema
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(routes => routes.DASHBOARD_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
