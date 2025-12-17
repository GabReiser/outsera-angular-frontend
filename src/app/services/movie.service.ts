import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Movie, PageableResponse, YearWinnerCount, StudioWinCount, ProducerInterval } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
private readonly API_URL = 'https://challenge.outsera.tech/api/movies';

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<PageableResponse<Movie>>(`${this.API_URL}?page=0&size=2000`).pipe(
      map(response => response.content)
    );
  }

getMovies(page: number, size: number, winner?: boolean, year?: number): Observable<PageableResponse<Movie>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // Verifica se winner não é null nem undefined (aceita false e true)
    if (winner !== undefined && winner !== null) {
      params = params.set('winner', winner.toString());
    }

    if (year) {
      params = params.set('year', year.toString());
    }
    return this.http.get<PageableResponse<Movie>>(this.API_URL, { params });
  }

  getYearsWithMultipleWinners(): Observable<YearWinnerCount> {
    return this.http.get<YearWinnerCount>(
      `${this.API_URL}/movies?projection=years-with-multiple-winners&page=0&size=99`
    );
  }

  getStudiosWithWinCount(): Observable<StudioWinCount> {
    return this.http.get<StudioWinCount>(
      `${this.API_URL}/movies?projection=studios-with-win-count&page=0&size=99`
    );
  }

  getMaxMinWinInterval(): Observable<ProducerInterval> {
    return this.http.get<ProducerInterval>(
      `${this.API_URL}/movies?projection=max-min-win-interval-for-producers&page=0&size=99`
    );
  }

 getMoviesByYear(year: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.API_URL}/movies?winner=true&year=${year}&page=0&size=99`
    );
  }
}