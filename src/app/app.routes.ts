import { Routes } from '@angular/router';

// 🚀 محاكاة حارس أمان ذكي: يفحص وجود التوكن أو اسم المستخدم قبل السماح بالعبور للداشبورد
const isAuthenticated = () => !!localStorage.getItem('username') || !!localStorage.getItem('name');

export const routes: Routes = [
  // 🔒 تأمين البوابة الرئيسية: إذا فتح المستخدم الموقع لأول مرة، يوجه قسرياً لصفحة اللوجن (auth)
  {
    path: '',
    redirectTo: isAuthenticated() ? 'dashboard' : 'auth',
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
      import('./layout/main-layout/main-layout.component').then(component => component.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => 
          import('./features/dashboard/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'portfolio',
        loadComponent: () => 
          import('./features/portfolio/pages/portfolio.component').then(m => m.PortfolioComponent)
      },
      {
        path: 'portfolio/details/:id',
        loadComponent: () => 
          import('./features/portfolio/portfolio-details/portfolio-details.component').then(m => m.PortfolioDetailsComponent)
      }
    ]
  },
  // 🔒 حماية احتياطية ضد المسارات العشوائية المكسورة
  {
    path: '**',
    redirectTo: isAuthenticated() ? 'dashboard' : 'auth'
  }
];
