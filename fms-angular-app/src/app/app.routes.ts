import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    title: 'MainPage',
    loadComponent: () => import('./pages/mainPage/mainPage.component').then((m) => m.MainPage),
  },
  {
    path: 'charts',
    title: 'ChartsPage',
    loadComponent: () => import('./pages/chartPage/chartPage.component').then((m) => m.ChartsPage),
  }
];
