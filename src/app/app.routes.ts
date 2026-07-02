import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // This loads your restored login view component as the landing page
    loadComponent: () => import('./app').then(m => m.AppComponent)
  }
];
