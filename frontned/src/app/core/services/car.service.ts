import { Injectable } from '@angular/core';
import { CarInfo, CarNew, CarFilter, PriceInfo } from '../models';
import { BaseCrudService } from './base-crud.service';
import { ApiService } from './api.service';

@Injectable()
export class CarService extends BaseCrudService<CarInfo, CarNew>  {

  constructor(_api: ApiService) {
    super(_api, 'car')
  }

  convert(data: any): CarInfo {
    let prices = data.prices.map((p: any) => 
      ({...p, createdAt: new Date(p.createdAt).toLocaleDateString('en-US')})) as PriceInfo[]

    let car: CarInfo = {
      id: data.id,
      brand: data.brand,
      color: data.color,
      model: data.model,
      description: data.description,
      engineVolume: data.engineVolume,
      prices: [...prices].sort((a, b) => a.id - b.id),
      price: [...prices].sort((b, a) => a.id - b.id)[0].value
    }
    
    
    return car
  }
}
