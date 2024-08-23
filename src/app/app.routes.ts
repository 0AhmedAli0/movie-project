import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { TvComponent } from './tv/tv.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { guardGuard } from './guard.guard';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TvDetailesComponent } from './tv-detailes/tv-detailes.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { SeasonDetailsComponent } from './season-details/season-details.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [guardGuard], component: HomeComponent },
  { path: 'movies', canActivate: [guardGuard], component: MoviesComponent },
  { path: 'tv', canActivate: [guardGuard], component: TvComponent },
  {
    path: 'moviedetails/:id',
    canActivate: [guardGuard],
    component: MovieDetailsComponent,
  },
  {
    path: 'tvdetails/:id',
    canActivate: [guardGuard],
    component: TvDetailesComponent,
  },
  {
    path: 'tvdetails/:id/SeasonDetails/:id',
    canActivate: [guardGuard],
    component: SeasonDetailsComponent,
  },
  {
    path: 'PersonDetails/:id',
    canActivate: [guardGuard],
    component: PersonDetailsComponent,
  },
  {
    path: 'search/:query',
    canActivate: [guardGuard],
    component: SearchComponent,
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((x) => x.SettingsModule),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./settings/profile/profile.component').then(
        (y) => y.ProfileComponent
      ),
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent },
];
