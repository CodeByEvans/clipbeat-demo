import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'edit-profile',
        loadComponent: () =>
          import('./features/profile/edit-profile/edit-profile.page').then(
            (m) => m.EditProfilePage
          ),
      },
    ],
  },
];
