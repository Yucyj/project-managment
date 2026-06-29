import { Routes } from '@angular/router';
import { AppComponent } from './app';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: AppComponent }
];
