import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    //  سطر إعادة التوجيه التلقائي المرن لأي دومين (Localhost أو أونلاين)
    pathMatch: 'full',
    redirectTo: 'login' 
  },
  {
    path: 'login',
    // تحميل صفحة تسجيل الدخول المقسمة كبوابة الحماية الرئيسية للموقع
    loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    // ربط الهيكل الخارجي (السايدبار الأبيض وتوب بار يسرى) كغطاء للموقع بالكامل
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        // عرض كروت الإحصائيات الصافية والرسمة الهندسية ممركزة بداخل الهيكل
        loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  },
  {
    path: '**',
    // حماية احتياطية: أي مسار عشوائي يكتبه المستخدم يطير به ويرجعه للوجن فوراً
    redirectTo: 'login'
  }
];
