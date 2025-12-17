export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface PageableResponse<T> {
  content: T[];
  pageable: {
    sort: { sorted: boolean; unsorted: boolean };
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  sort: { sorted: boolean; unsorted: boolean };
  numberOfElements: number;
  empty?: boolean;
}

export interface YearWinnerCount {
  years: {
    year: number;
    winnerCount: number;
  }[];
}

export interface StudioWinCount {
  studios: {
    name: string;
    winCount: number;
  }[];
}

export interface ProducerInterval {
  min: ProducerIntervalDetail[];
  max: ProducerIntervalDetail[];
}

export interface ProducerIntervalDetail {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}