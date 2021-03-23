import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export abstract class BaseCrudService<T> {

  constructor(protected _api: ApiService, protected route: string) { }

  getAll(params = {}) {
    return this._api.get(`/${this.route}`, params).pipe((data) => data) as Observable<T[]>
  }

  getById(id: number) {
    return this.get(id.toString())
  }
  
  get(url: string, params = {}){
    return this._api.get(`/${this.route}/${url}`, params).pipe((data) => data) as Observable<T>
  }
  delete(id: number) {
    this._api.delete(`/${this.route}/${id}`)
  }
  create(item: T) {
    this._api.post(`/${this.route}`, item)
  }
}
