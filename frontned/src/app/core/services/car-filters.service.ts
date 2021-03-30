import { CarInfo, CarFilter } from 'src/app/core/models';
import { Observable, Subject, Observer, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CarService } from './car.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarFiltersService {

  cars = new Observable<CarInfo[]>();
  filters = new Subject<CarFilter>()
  cache_filters: CarFilter = {}

  constructor(private _carService: CarService) { 

    this.cars = this.filters.pipe(switchMap(f => _carService.getAll(f)))
  }

  update(){
    this.filters.next(this.cache_filters)
  }

  setBrandAndModel(brandId?: number, modelId?: number){
    console.log('set to ', brandId, modelId)
    this.filters.next(Object.assign(this.cache_filters, { modelId: modelId, brandId: brandId }))
  }

  updateFilters(filters: CarFilter){
    this.filters.next(Object.assign(this.cache_filters, filters))
  }
  setLimit(limit: number){
    this.filters.next(Object.assign(this.cache_filters, {limit}))
  }
}
