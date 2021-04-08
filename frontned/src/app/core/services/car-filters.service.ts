import { CarInfo, CarFilter } from 'src/app/core/models';
import { Observable, Subject, Observer, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CarService } from './car.service';
import { debounceTime, distinctUntilChanged, switchMap, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarFiltersService {

  cars = new Observable<CarInfo[]>();
  oldestPrice = new BehaviorSubject<Date>(new Date());
  filters = new Subject<CarFilter>()
  cache_filters: CarFilter = {}

  constructor(private _carService: CarService) { 

    this.cars = this.filters
      .pipe(
        debounceTime(500), 
        switchMap(f => _carService.getAll(f)),
        tap(cars => this.updateDateRange(cars)))


  }
  updateDateRange(cars: CarInfo[]){
    let allDates = cars.reduce<Date[]>((a, car) => { a.push(...car.prices.map(p => p.createdAt)); return a },[])

    let sorted = allDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())


    this.oldestPrice.next(new Date(sorted[0]))
  }


  update(){
    this.filters.next(this.cache_filters)
  }

  setBrandAndModel(brandId?: number, modelId?: number){
    this.filters.next(Object.assign(this.cache_filters, { modelId: modelId, brandId: brandId }))
  }

  updateFilters(filters: CarFilter){
    this.filters.next(Object.assign(this.cache_filters, filters))
  }
  setLimit(limit: number){
    this.filters.next(Object.assign(this.cache_filters, {limit}))
  }
}
