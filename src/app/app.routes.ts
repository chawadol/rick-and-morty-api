import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'rick-and-morty', pathMatch: 'full' },

  {
    path: 'rick-and-morty',
    loadChildren: () => import('./rick-and-morty/routes'),
  },
];
