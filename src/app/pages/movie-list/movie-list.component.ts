import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  
  page: number = 0;
  size: number = 15;
  totalPages: number = 0;
  totalElements: number = 0;
  
  // Filtros
  filterYear: number | undefined;
  filterWinner: string = 'all'; 

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    let winnerParam: boolean | undefined = undefined;
    if (this.filterWinner === 'true') winnerParam = true;
    if (this.filterWinner === 'false') winnerParam = false;

    this.movieService.getMovies(this.page, this.size, winnerParam, this.filterYear)
      .subscribe({
        next: (response) => {
          this.movies = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
        },
        error: (err) => console.error('Erro ao carregar filmes', err)
      });
  }
  onFilterChange(): void {
    this.page = 0;
    this.loadMovies();
  }

  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.loadMovies();
    }
  }
}