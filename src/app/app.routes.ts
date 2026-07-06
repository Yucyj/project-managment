import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    // 🔗 استدعاء مسارات الـ Auth الفرعية بطريقة الـ Lazy Loading الاحترافية
    loadChildren: () =>
      import('./features/auth/auth.routes').then(routes => routes.AUTH_ROUTES)
  },
  {
    path: '',
    // ربط الهيكل الخارجي (السايدبار الأبيض وتوب بار يسرى الفاخر) كغطاء للموقع بالكامل
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component')
        .then(component => component.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        // 🔗 استدعاء مسارات الداشبورد الفرعية بطريقة الـ Lazy Loading الاحترافية
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
