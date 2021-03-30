import { Injectable } from '@angular/core';
import { CarInfo, CarNew, CarFilter } from '../models';
import { BaseCrudService } from './base-crud.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Injectable()
export class CarService extends BaseCrudService<CarInfo, CarNew>  {

  constructor(_api: ApiService) {
    super(_api, 'car')
  }

  // getFiltered(filter: Observable<CarFilter>): Observable<CarInfo[]> {
  //   return filter.pipe(debounceTime(200), switchMap(filters => this.getAll(filters)))
  // }
}
