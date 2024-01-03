import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule, } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './screens/movie/movie.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieDetailsComponent } from './screens/movie-details/movie-details.component';
import { RechercheBarComponent } from './components/recherche-bar/recherche-bar.component';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';
import { FavoriteMoviesComponent } from './screens/favorite-movies/favorite-movies.component';
import { MovieCommentsComponent } from './components/movie-comments/movie-comments.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MovieDetailsComponent,
    RechercheBarComponent,
    CommentsSectionComponent,
    FavoriteMoviesComponent,
    MovieCommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
