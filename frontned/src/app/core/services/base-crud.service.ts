import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

export abstract class BaseCrudService<TInfo, TNew> {

  constructor(protected _api: ApiService, protected route: string) { }

  convert?(data: any): TInfo

  onProccesOne(data: Observable<any>): Observable<TInfo> {
    return data.pipe(map(val => this.convert ? this.convert(val) : val))
  }
  onProccesMany(data: Observable<any>): Observable<TInfo[]> {
    return data.pipe(map(val => val.map((data: any) => this.convert ? this.convert(data) : data)))
  }


  getById(id: number) {
    return this.get(id.toString())
  }
  

  getAll(params = {}): Observable<TInfo[]> {
    return this.onProccesMany(this._api.get(`/${this.route}`, params))
  }
  
  get(url: string, params = {}){
    return this.onProccesOne(this._api.get(`/${this.route}/${url}`, params).pipe((data) => data))
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
