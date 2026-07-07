import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    // 🚀 ربط مباشر وصارم لإنهاء خطأ TS2339 فوراً وتحويل التيرمينال للأخضر
    component: DashboardComponent
  }
];
