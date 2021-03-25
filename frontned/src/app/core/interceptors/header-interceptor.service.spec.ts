import { TestBed } from '@angular/core/testing';

import { HeaderInterceptor } from './header-interceptor.service';

describe('HeaderInterceptor', () => {
  let service: HeaderInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
