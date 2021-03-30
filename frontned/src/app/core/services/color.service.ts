import { Injectable } from '@angular/core';
import { ColorInfo, ColorNew } from '../models'
import { ApiService } from './api.service';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService extends BaseCrudService<ColorInfo, ColorNew>  {

  constructor(_api: ApiService) {
    super(_api, 'color')
  }
}
