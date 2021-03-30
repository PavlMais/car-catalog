import { Injectable } from '@angular/core';
import { ModelInfo, ModelNew } from './../models/model';
import { ApiService } from './api.service';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ModelService extends BaseCrudService<ModelInfo, ModelNew>  {

  constructor(_api: ApiService) {
    super(_api, 'model')
  }
}
