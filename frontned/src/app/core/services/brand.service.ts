import { Injectable } from '@angular/core';
import { Brand } from '../models';
import { ApiService } from './api.service';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseCrudService<Brand>  {

  constructor(_api: ApiService) {
    super(_api, 'brand')
  }
}

