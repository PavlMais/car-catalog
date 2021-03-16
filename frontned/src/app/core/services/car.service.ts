import { Injectable } from '@angular/core';
import { Car } from '../models';
import { ApiService } from './api.service';
import { BaseCrudService } from './base-crud.service';

@Injectable()
export class CarService extends BaseCrudService<Car>  {

  constructor(_api: ApiService) {
    super(_api, 'car')
  }
}
