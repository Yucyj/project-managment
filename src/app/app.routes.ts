import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(routes => routes.AUTH_ROUTES)
  },
  {
    path: '',
    // تحميل الهيكل الخارجي الفاخر للموقع
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(component => component.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => 
          import('./features/dashboard/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      // 🚀 التصحيح المعماري الحاسم: قراءة الملف مباشرة من مجلد pages المتوافق مع جهازك بالملي
      {
        path: 'portfolio',
        loadComponent: () => 
          import('./features/portfolio/pages/portfolio.component').then(m => m.PortfolioComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
