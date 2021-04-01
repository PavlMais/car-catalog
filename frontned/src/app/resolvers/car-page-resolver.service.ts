import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CarService } from '@services';
import { CarInfo } from '../core/models'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarPageResolverService implements Resolve<CarInfo> {

  constructor(private _carService: CarService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CarInfo> {
    return this._carService.getById(parseInt(route.params.id));
  }



}
