import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CarService } from '../core/services/car.service';
import { Car } from '../core/models'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarPageResolverService implements Resolve<Car> {

  constructor(private _carService: CarService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Car | Observable<Car> | Promise<Car> {
    return this._carService.getById(2)
  }



}
