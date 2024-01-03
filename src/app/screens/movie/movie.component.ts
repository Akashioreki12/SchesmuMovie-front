import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UsersloginService } from 'src/app/services/users.login.service';
import { Router } from '@angular/router';
import { DialogLoginComponent } from 'src/app/shared/dialog-login/dialog-login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies: any[] = [];
  searchQuery: string = '';
  searchResults: any[] = [];

  isAuthenticated = false;
  userSub: Subscription;
  dialog: MatDialog;

  private apiKey = 'b6bf5b3fbe3c1498610aea6654fd8c73';
  private apiUrlLatest = 'https://api.themoviedb.org/3/discover/movie'; // Latest movies endpoint
  private apiUrlSearch = 'https://api.themoviedb.org/3/search/movie'; // Search movies endpoint
  private currentPage = 1;

  constructor(private http: HttpClient,private router: Router,
    private userLoginService: UsersloginService,) { }

    navigateToFavorite() {
    this.router.navigate(['/favorites']);
  }

  ngOnInit(): void {
    this.userSub = this.userLoginService.userSubject.subscribe((user) => {
      console.log('user', user);
      this.isAuthenticated = !!user;
    });
    this.fetchLatestMovies();
  }

  fetchLatestMovies() {
    const params = {
      api_key: this.apiKey,
      language: 'en-US',
      sort_by: 'popularity.desc',
      include_adult: false,
      include_video: false,
      page: this.currentPage.toString(),
    };

    this.http.get<any>(this.apiUrlLatest, { params })
      .subscribe(data => {
        this.movies = data.results.map((movie: any) => {
          movie.posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          return movie;
        });
        this.searchMovies(); // Display latest movies and update search results
      });
  }

  searchMovies() {
    if (this.searchQuery.trim() === '') {
      this.searchResults = [...this.movies];
    } else {
      const searchParams = {
        api_key: this.apiKey,
        language: 'en-US',
        query: this.searchQuery,
        include_adult: false,
        include_video: false,
        page: '1',
      };

      this.http.get<any>(this.apiUrlSearch, { params: searchParams })
        .subscribe(data => {
          this.searchResults = data.results.map((movie: any) => {
            movie.posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            return movie;
          });
        });
    }
  }

  loadMoreMovies() {
    this.currentPage++;
    this.fetchLatestMovies();
  }

  onLogout() {
    this.userLoginService.logout();
  }
  onLogin() {
    this.router.navigate(['/login']);
  }

  onOpenFavorites() {
    console.log('this.isAuthenticated', this.isAuthenticated);
    if (this.isAuthenticated) {
      this.router.navigate(['/favorites']);
    } else {
      {
        const dialogRef = this.dialog.open(DialogLoginComponent);

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.router.navigate(['/signup']);
          }
        });
      }
    }
  }


}
