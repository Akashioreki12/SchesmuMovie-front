import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './screens/movie/movie.component';
import { MovieDetailsComponent } from './screens/movie-details/movie-details.component';
import { LoginComponent } from './screens/login/login.component';
import { SignupComponent } from './screens/signup/signup.component';
import { FavoriteMoviesComponent } from './screens/favorite-movies/favorite-movies.component';

const routes: Routes = [
    { path: 'movies', component: MovieComponent },
    { path: 'movie-details/:id', component: MovieDetailsComponent },
    { path: '', redirectTo: '/movies', pathMatch: 'full' },
    {path: 'favorites' , component: FavoriteMoviesComponent},

    {path: 'login' , component:LoginComponent},
    {path: 'signup' , component:SignupComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
