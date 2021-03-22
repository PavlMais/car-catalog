import { Injectable } from '@angular/core';
import { Color } from '../models'
import { ApiService } from './api.service';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService extends BaseCrudService<Color>  {

  constructor(_api: ApiService) {
    super(_api, 'color')
  }
}
