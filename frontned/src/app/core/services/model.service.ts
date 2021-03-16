import { ApiService } from './api.service';
import { Model } from './../models/model';
import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ModelService extends BaseCrudService<Model>  {

  constructor(_api: ApiService) {
    super(_api, 'model')
  }
}
