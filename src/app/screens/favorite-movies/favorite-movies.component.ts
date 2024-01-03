import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';

import { forkJoin } from 'rxjs';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css']
})
export class FavoriteMoviesComponent implements OnInit {
  favoriteMovies: any[] = [];

  private readonly apiKey: string = 'b6bf5b3fbe3c1498610aea6654fd8c73';
  private readonly apiUrl: string = 'https://api.themoviedb.org/3/movie/';

  constructor(
    private favoriteService: FavoriteService,
    private http: HttpClient,
    private router: Router // Inject Router
  ) { }

  ngOnInit(): void {
    this.favoriteService.getAllFavorites().subscribe(
      (favorites) => {
        const movieIds = favorites.map(favorite => favorite.movieId);
        this.fetchMoviesDetails(movieIds);
      },
      (error) => {
        console.error('Error fetching favorite movies:', error);
      }
    );
  }

  fetchMoviesDetails(movieIds: number[]): void {
    const requests = movieIds.map(movieId =>
      this.http.get<any>(`${this.apiUrl}${movieId}?api_key=${this.apiKey}&language=en-US`)
    );

    forkJoin(requests).subscribe(
      (movies) => {
        this.favoriteMovies = movies.map((movie, index) => {
          return {
            id: movieIds[index], // Assuming you want to store the movie ID for deletion
            title: movie.title,
            poster_path: movie.poster_path,
          };
        });
      },
      (error) => {
        console.error('Error fetching favorite movie details:', error);
      }
    );
  }

  deleteFavorite(movieId: number): void {
  console.log('Deleting movie with ID:', movieId);

  this.favoriteService.deleteFavorite(movieId).subscribe(
    () => {
      console.log('Successfully deleted movie with ID:', movieId);

      // Fetch the updated list of favorites
      this.favoriteService.getAllFavorites().subscribe(
        (favorites) => {
          const updatedMovieIds = favorites.map(favorite => favorite.movieId);
          console.log('Updated favorite movie IDs:', updatedMovieIds);

          this.fetchMoviesDetails(updatedMovieIds);
        },
        (error) => {
          console.error('Error fetching updated favorite movies:', error);
        }
      );
    },
    (error) => {
      console.error('Error deleting favorite movie:', error);
    }
  );
}


  returnToHome(): void {
    // Navigate back to the home page
    this.router.navigate(['/']);
  }
}
