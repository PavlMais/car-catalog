import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export abstract class BaseCrudService<T> {

  constructor(protected _api: ApiService, protected route: string) { }

  getAll(params: HttpParams = new HttpParams()) {
    return this._api.get(`/${this.route}`, params).pipe((data) => data) as Observable<T[]>
  }

  get(id: number) {
    return this._api.get(`/${this.route}/${id}`).pipe((data) => data) as Observable<T>
  }
  delete(id: number) {
    this._api.delete(`/${this.route}/${id}`)
  }
  create(item: T) {
    this._api.post(`/${this.route}`, item)
  }
}
