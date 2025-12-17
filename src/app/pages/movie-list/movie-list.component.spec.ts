import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { of } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { PageableResponse } from '../../models/movie.model';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture!: ComponentFixture<MovieListComponent>;
  let movieServiceSpy!: jasmine.SpyObj<MovieService>;

  const mockResponse: PageableResponse<any> = {
    content: [],
    totalPages: 5,
    totalElements: 50,
    pageable: {} as any,
    last: false,
    first: true,
    size: 10,
    number: 0,
    sort: {} as any,
    numberOfElements: 0
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getMovies']);

    await TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [{ provide: MovieService, useValue: spy }]
    }).compileComponents();

    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    movieServiceSpy.getMovies.and.returnValue(of(mockResponse));

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load movies on init', () => {
    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith(0, 15, undefined, undefined);
  });

  it('should change page and reload movies', () => {
    component.totalPages = 5;
    component.changePage(1);

    expect(component.page).toBe(1);
    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith(1, 15, undefined, undefined);
  });

  it('should reset page to 0 when filter changes', () => {
    component.page = 3;
    component.filterYear = 1990;
    component.onFilterChange();

    expect(component.page).toBe(0);
    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith(0, 15, undefined, 1990);
  });

  it('should handle winner filter conversion correctly', () => {
    component.filterWinner = 'true';
    component.onFilterChange();

    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith(0, 15, true, undefined);
  });
});