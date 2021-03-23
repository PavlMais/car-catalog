import { CarFilter } from 'src/app/core/models/cars_filter';
import { Injectable } from '@angular/core';
import { Car } from '../models';
import { ApiService } from './api.service';
import { BaseCrudService } from './base-crud.service';
import { Observable } from 'rxjs';

@Injectable()
export class CarService extends BaseCrudService<Car>  {

  constructor(_api: ApiService) {
    super(_api, 'car')
  }

  getFiltered(filter: CarFilter): Observable<Car[]> {
    return this.getAll(filter)
  }
}
