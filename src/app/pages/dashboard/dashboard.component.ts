import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Movie, ProducerIntervalDetail, StudioWinCount, YearWinnerCount } from '../../models/movie.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  // Dados processados para a tela
  yearsWithMultipleWinners: YearWinnerCount['years'] = [];
  topStudios: StudioWinCount['studios'] = [];
  producersMaxInterval: ProducerIntervalDetail[] = [];
  producersMinInterval: ProducerIntervalDetail[] = [];
  moviesByYear: Movie[] = [];
  searchYear: number | undefined;

  private allWinners: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe({
      next: (movies) => {
        this.allWinners = movies.filter(m => m.winner);
        
        this.calculateYearsMultipleWinners();
        this.calculateTopStudios();
        this.calculateProducersIntervals();
      },
      error: (err) => console.error('Erro ao carregar dados', err)
    });
  }

  private calculateYearsMultipleWinners() {
    const yearsMap = new Map<number, number>();

    this.allWinners.forEach(movie => {
      const count = yearsMap.get(movie.year) || 0;
      yearsMap.set(movie.year, count + 1);
    });

    this.yearsWithMultipleWinners = Array.from(yearsMap.entries())
      .filter(([year, count]) => count > 1)
      .map(([year, count]) => ({ year, winnerCount: count }));
  }

  private calculateTopStudios() {
    const studioMap = new Map<string, number>();

    this.allWinners.forEach(movie => {
      movie.studios.forEach(studio => {
        const count = studioMap.get(studio) || 0;
        studioMap.set(studio, count + 1);
      });
    });

    this.topStudios = Array.from(studioMap.entries())
      .map(([name, count]) => ({ name, winCount: count }))
      .sort((a, b) => b.winCount - a.winCount) 
      .slice(0, 3);
  }

  private calculateProducersIntervals() {
    const producerWins = new Map<string, number[]>();

    this.allWinners.forEach(movie => {
      movie.producers.forEach(producer => {
        const years = producerWins.get(producer) || [];
        years.push(movie.year);
        producerWins.set(producer, years);
      });
    });

    let minIntervals: ProducerIntervalDetail[] = [];
    let maxIntervals: ProducerIntervalDetail[] = [];

    producerWins.forEach((years, producer) => {
      if (years.length >= 2) {
        years.sort((a, b) => a - b);

        for (let i = 0; i < years.length - 1; i++) {
          const diff = years[i+1] - years[i];
          const intervalObj = {
            producer,
            interval: diff,
            previousWin: years[i],
            followingWin: years[i+1]
          };

          minIntervals.push(intervalObj);
          maxIntervals.push(intervalObj);
        }
      }
    });

    const minVal = Math.min(...minIntervals.map(x => x.interval));
    this.producersMinInterval = minIntervals.filter(x => x.interval === minVal);

    const maxVal = Math.max(...maxIntervals.map(x => x.interval));
    this.producersMaxInterval = maxIntervals.filter(x => x.interval === maxVal);
  }

  searchMoviesByYear(): void {
    if (this.searchYear) {
      this.moviesByYear = this.allWinners.filter(m => m.year == this.searchYear);
    }
  }
}