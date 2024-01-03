import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Router } from '@angular/router';
import { UsersloginService } from 'src/app/services/users.login.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieId!: number;
  movieDetails: any | null = null;
  isFavorite: boolean = false;

    isAuthenticated = false;
  userSub: Subscription;
  dialog: MatDialog;

  private apiKey = 'b6bf5b3fbe3c1498610aea6654fd8c73';
  private apiUrl = 'https://api.themoviedb.org/3/movie/';

  constructor(private route: ActivatedRoute, private http: HttpClient, private favoriteService: FavoriteService,private router: Router,private userLoginService: UsersloginService) { }

navigateToFavorite() {
    this.router.navigate(['/favorites']);
  }

  toggleFavorite() {
  if (this.isFavorite) {
    // If already a favorite, remove it
    this.favoriteService.deleteFavorite(this.movieId).subscribe(
      () => {
        console.log('Removed from favorites');
        this.isFavorite = false;
      },
      (error) => {
        console.error('Error removing from favorites:', error);
      }
    );
  } else {
    // If not a favorite, check if it is already in favorites
    this.favoriteService.getFavoriteById(this.movieId).subscribe(
      (favorite) => {
        if (favorite) {
          console.log('Movie is already in favorites');
          this.isFavorite = true;
        } else {
          // If not in favorites, add it
          const favoriteMovie = {
            movieId: this.movieId,
            // Add other properties if needed
          };

          this.favoriteService.saveFavorite(favoriteMovie).subscribe(
            () => {
              console.log('Added to favorites');
              this.isFavorite = true;
            },
            (error) => {
              console.error('Error adding to favorites:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error checking if the movie is a favorite:', error);
      }
    );
  }
}





  ngOnInit(): void {

    this.userSub = this.userLoginService.userSubject.subscribe((user) => {
      console.log('user', user);
      this.isAuthenticated = !!user;
    });

    this.movieId = +this.route.snapshot.paramMap.get('id')!;

    this.http.get<any>(`${this.apiUrl}${this.movieId}?api_key=${this.apiKey}&language=en-US`)
      .subscribe(
        (data) => {
          this.movieDetails = data;
          // Check if the movie is already in favorites
          this.favoriteService.getFavoriteById(this.movieId).subscribe(
  (favorite) => {
    this.isFavorite = !!favorite; // Update isFavorite based on whether the movie is in favorites
  },
  (error) => {
    console.error('Error checking if the movie is a favorite:', error);
  }
);

        },
        (error) => {
          console.error('Error fetching movie details:', error);
        }
      );
  }
}
