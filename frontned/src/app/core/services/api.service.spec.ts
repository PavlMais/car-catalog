import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#get(\'/colors\') should return colors', () => {
    let dummyColors = [
      {"id":6,"name":"black","rgb":0},
      {"id":7,"name":"red","rgb":16711680},
      {"id":8,"name":"Green","rgb":32768},
      {"id":9,"name":"Gray","rgb":8421504}
    ]
    
    service.get('/color').subscribe(c => {
      expect(c.length).toBe(dummyColors.length);
      expect(c).toEqual(dummyColors);
    })

    const req = httpMock.expectOne(`${service.base_url}/color`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyColors);
  })

});
