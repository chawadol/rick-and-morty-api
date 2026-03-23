import { ActivatedRoute, Routes } from '@angular/router';
import { RickAndMortyRoot } from './pages/rick-and-morty-root/rick-and-morty-root';
import { CharactersListPage } from './pages/characters-list-page/characters-list-page';
import { CharacterViewPage } from './pages/character-view-page/character-view-page';
import { ModuleRoute } from './tokens';
import { inject } from '@angular/core';
import { EpisodesListPage } from './pages/episodes-list-page/episodes-list-page';
import { EpisodeViewPage } from './pages/episode-view-page/episode-view-page';
import { LocationsListPage } from './pages/locations-list-page/locations-list-page';
import { LocationViewPage } from './pages/location-view-page/location-view-page';
export default [
  {
    path: '',
    component: RickAndMortyRoot,
    children: [
      {
        path: '',
        redirectTo: 'characters',
        pathMatch: 'full',
      },

      {
        path: 'characters',
        children: [
          {
            path: '',
            component: CharactersListPage,
          },

          {
            path: ':id',
            component: CharacterViewPage,
            providers: [
              {
                provide: ModuleRoute,
                useFactory: () => inject(ActivatedRoute),
              },
            ],
          },
        ],
      },

      {
        path: 'episodes',
        children: [
          {
            path: '',
            component: EpisodesListPage,
          },

          {
            path: ':id',
            component: EpisodeViewPage,
            providers: [
              {
                provide: ModuleRoute,
                useFactory: () => inject(ActivatedRoute),
              },
            ],
          },
        ],
      },

      {
        path: 'locations',
        children: [
          {
            path: '',
            component: LocationsListPage,
          },

          {
            path: ':id',
            component: LocationViewPage,
            providers: [
              {
                provide: ModuleRoute,
                useFactory: () => inject(ActivatedRoute),
              },
            ],
          },
        ],
      },
    ],
  },
] as Routes;
