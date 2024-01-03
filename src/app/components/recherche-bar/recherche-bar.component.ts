import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recherche-bar',
  templateUrl: './recherche-bar.component.html',
  styleUrls: ['./recherche-bar.component.css']
})
export class RechercheBarComponent {
  @Output() searchMovie = new EventEmitter<string>();
  searchQuery: string = '';

  onSearchChange(): void {
    this.searchMovie.emit(this.searchQuery);
  }
}
