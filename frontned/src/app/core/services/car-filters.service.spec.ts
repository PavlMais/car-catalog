import { TestBed } from '@angular/core/testing';

import { CarFiltersService } from './car-filters.service';

describe('CarFiltersService', () => {
  let service: CarFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
