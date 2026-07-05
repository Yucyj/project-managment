import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // 1. تحميل صفحة تسجيل الدخول كصفحة رئيسية افتراضية للموقع
    loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    // 2. ربط الهيكل الخارجي (السايد بار والشريط العلوي) ليعمل كغطاء للموقع بالكامل
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        // 🚀 حقن الداشبورد بداخل الهيكل تلقائياً ليظهر السايد بار والتوپ بار حول الكروت
        loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  }
];
