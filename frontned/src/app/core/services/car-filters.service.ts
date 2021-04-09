import { CarInfo, CarFilter } from '@models';
import { Observable, Subject, Observer, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, map, tap } from 'rxjs/operators';
import { CarService } from './car.service';
import { PaginatedResult } from './base-crud.service'
@Injectable({
  providedIn: 'root'
})
export class CarFiltersService {

  cars = new Observable<PaginatedResult<CarInfo>>();
  oldestPrice = new BehaviorSubject<Date>(new Date());
  filters = new BehaviorSubject<CarFilter>({})

  constructor(private _carService: CarService) { 

    this.cars = this.filters
      .pipe(
        debounceTime(500), 
        switchMap(f => _carService.getFiltered(f)),
        tap(res => this.updateDateRange(res.items)),
        map(res => ({...res, items: this.setPriceByDate(res.items)})))


  }
  setPriceByDate(cars: CarInfo[]): CarInfo[] {
    let priceDate = this.filters.value.priceDate

    if(!priceDate) return cars
        
    return cars.map(car => {
      let price = car.prices.filter(p => {
        p.createdAt.setHours(0,0,0,0)
        return p.createdAt <= priceDate!
      }).slice(-1)[0]
      
      car.priceByDate = price.value
      return car
    })
  }

  updateDateRange(cars: CarInfo[]){
    let allDates = cars.reduce<Date[]>((a, car) => { a.push(...car.prices.map(p => p.createdAt)); return a },[])

    let sorted = allDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

    this.oldestPrice.next(new Date(sorted[0]))
  }

  setPage(page: number){
    let limit = this.filters.value.limit || 10
    this.update({offset: page * limit})
  }
 

  setBrandAndModel(brandId?: number, modelId?: number){
    this.update({ modelId, brandId })
  }

  updateFilters(filters: CarFilter){
    this.update(filters)
  }

  setLimit(limit: number){
    this.update({ limit })
  }
  update(params: any = {}){
    this.filters.next(Object.assign(this.filters.value, params))
  }
}
