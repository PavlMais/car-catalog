import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ColorService } from './color.service';
import { ColorInfo } from '../../core/models'
import { environment } from 'src/environments/environment'


describe('ColorService', () => {
  let service: ColorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ColorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('#getAll() should return all colors', () => {
    let dummyColors: ColorInfo[] = [
      {"id":6,"name":"black","rgb":0},
      {"id":7,"name":"red","rgb":16711680},
      {"id":8,"name":"Green","rgb":32768},
      {"id":9,"name":"Gray","rgb":8421504}
    ]

    service.getAll().subscribe(c => {
      expect(c.length).toBe(dummyColors.length);
      expect(c).toEqual(dummyColors);
    })

    const req = httpMock.expectOne(`${environment.api_base_url}/color`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyColors);
  })

  it('#getById(N) should return color with id N', () => {
    let dummyColor: ColorInfo = { "id": 8, "name": "Green", "rgb": 32768 }
    let colorId = 8


    service.getById(colorId).subscribe(color => {
      expect(color).toEqual(dummyColor);
    })

    
    const req = httpMock.expectOne(`${environment.api_base_url}/color/${colorId}`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyColor);
  })
});

