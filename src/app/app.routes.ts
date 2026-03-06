import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DinoList } from './pages/dino-list/dino-list';
import { DinoDetail } from './pages/dino-list/dino-detail';
import { Games } from './pages/games/games';
import { Favorites } from './pages/favorites/favorites';
import { About } from './pages/about/about';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'dinosaurs', component: DinoList },
  { path: 'dinosaurs/:name', component: DinoDetail },
  { path: 'games', component: Games },
  { path: 'favorites', component: Favorites },
  { path: 'about', component: About }
];
