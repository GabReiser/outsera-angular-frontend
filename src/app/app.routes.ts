import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
  { path: 'dashboard', component: DashboardComponent },
  
  { path: 'movies', component: MovieListComponent }
];