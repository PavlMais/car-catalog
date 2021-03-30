import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BrandInfo, BrandNew } from '../models';
import { ApiService } from './api.service';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseCrudService<BrandInfo, BrandNew>  {

  constructor(_api: ApiService) {
    super(_api, 'brand')
  }
  // getAll(params:any = {} ): Observable<BrandInfo[]>{
  //   return super.getAll().pipe(map(bs => bs.map( b => ({id: b.id, name: b.name}))))
  // }
}

