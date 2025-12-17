import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock!: HttpTestingController;
  const API_URL = 'https://challenge.outsera.tech/api/movies';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all movies (getAllMovies) with correct pagination params', () => {
    const mockMovies = { content: [{ id: 1, title: 'Test Movie' }] };

    service.getAllMovies().subscribe(movies => {
      expect(movies.length).toBe(1);
      expect(movies[0].title).toBe('Test Movie');
    });

    const req = httpMock.expectOne(`${API_URL}?page=0&size=2000`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should retrieve movies with filters (getMovies)', () => {
    const page = 0;
    const size = 10;
    const winner = true;
    const year = 1990;

    service.getMovies(page, size, winner, year).subscribe();

    const req = httpMock.expectOne(req => 
      req.url === API_URL && 
      req.params.get('page') === '0' &&
      req.params.get('size') === '10' &&
      req.params.get('winner') === 'true' &&
      req.params.get('year') === '1990'
    );
    
    expect(req.request.method).toBe('GET');
    req.flush({ content: [] });
  });
});
