import { Routes } from '@angular/router';
import { MainPage } from './pages/mainPage.component';
export const routes: Routes = [
  {
    path: '',
    title: 'MainPage',
    component: MainPage,
  },
  {
    path: 'charts',
    title: 'ChartsPage',
    loadComponent: () => import('./pages/chartsPage.component').then((m) => m.ChartsPage),
  }
];
