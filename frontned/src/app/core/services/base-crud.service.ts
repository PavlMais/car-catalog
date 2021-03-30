import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export abstract class BaseCrudService<TInfo, TNew> {

  constructor(protected _api: ApiService, protected route: string) { }

  getAll(params = {}) {
    return this._api.get(`/${this.route}`, params).pipe((data) => data) as Observable<TInfo[]>
  }
  getById(id: number) {
    return this.get(id.toString())
  }

  
  get(url: string, params = {}){
    return this._api.get(`/${this.route}/${url}`, params).pipe((data) => data) as Observable<TInfo>
  }
  delete(id: number) {
    return this._api.delete(`/${this.route}/${id}`).subscribe()
  }
  create(item: TNew) {
    return this._api.post(`/${this.route}`, item).subscribe()
  }
  update(itemId: number, item: TNew){
    return this._api.put(`/${this.route}/${itemId}`, item).subscribe()
  }
}
