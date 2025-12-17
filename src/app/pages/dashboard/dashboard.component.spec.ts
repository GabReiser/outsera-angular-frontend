import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MovieService } from '../../services/movie.service';
import { of } from 'rxjs';
import { Movie } from '../../models/movie.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture!: ComponentFixture<DashboardComponent>;
  let movieServiceSpy!: jasmine.SpyObj<MovieService>;
  const mockMovies: Movie[] = [
    { id: 1, year: 1980, title: 'Movie A', studios: ['Studio A'], producers: ['Producer A'], winner: true },
    { id: 2, year: 1980, title: 'Movie B', studios: ['Studio A'], producers: ['Producer B'], winner: true },
    { id: 3, year: 1982, title: 'Movie C', studios: ['Studio B'], producers: ['Producer A'], winner: true },
    { id: 4, year: 1990, title: 'Movie D', studios: ['Studio C'], producers: ['Producer C'], winner: false }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getAllMovies', 'getYearsWithMultipleWinners', 'getStudiosWithWinCount', 'getMaxMinWinInterval']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: MovieService, useValue: spy }
      ]
    }).compileComponents();

    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    movieServiceSpy.getAllMovies.and.returnValue(of(mockMovies));
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should calculate years with multiple winners correctly', () => {
    expect(component.yearsWithMultipleWinners.length).toBe(1);
    expect(component.yearsWithMultipleWinners[0].year).toBe(1980);
    expect(component.yearsWithMultipleWinners[0].winnerCount).toBe(2);
  });

  it('should calculate top studios correctly', () => {
    const studioA = component.topStudios.find(s => s.name === 'Studio A');
    expect(studioA).toBeDefined();
    expect(studioA?.winCount).toBe(2);
  });

  it('should calculate producer intervals correctly', () => {
  
    expect(component.producersMaxInterval.length).toBeGreaterThan(0);
    expect(component.producersMaxInterval[0].producer).toBe('Producer A');
    expect(component.producersMaxInterval[0].interval).toBe(2);
    expect(component.producersMaxInterval[0].previousWin).toBe(1980);
    expect(component.producersMaxInterval[0].followingWin).toBe(1982);
  });

  it('should filter movies by year when searching', () => {
    component.searchYear = 1980;
    component.searchMoviesByYear();

    expect(component.moviesByYear.length).toBe(2);
    expect(component.moviesByYear[0].year).toBe(1980);
  });
});
