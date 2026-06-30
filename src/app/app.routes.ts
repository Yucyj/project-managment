import { Routes } from '@angular/router';
import { AppComponent } from './app';
import { DashboardComponent } from './dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: AppComponent },
  { path: 'dashboard/index', component: DashboardComponent } // Validates the exact path link target
];

