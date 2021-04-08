import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';



export interface PaginatedResult<T>{
  items: T[]
  totalCount: number
}

export interface PaginatedParams {
  offset?: number
  limit?: number
  [key: string]: any
}
export abstract class BaseCrudService<TInfo, TNew> {

  constructor(protected _api: ApiService, protected route: string) {
    this.tryConvert = this.tryConvert.bind(this)
  }

  convert?(data: any): TInfo

  onProccesOne(data: Observable<any>): Observable<TInfo> {
    return data.pipe(map(this.tryConvert))
  }
  onProccesMany(data: Observable<any>): Observable<TInfo[]> {
    return data.pipe(map(val => val.map(this.tryConvert)))
  }

  getPaginated(params: PaginatedParams): Observable<PaginatedResult<TInfo>> {
    return this._api.get(`/${this.route}`, params)
                    .pipe(map(r => ({ totalCount: r.totalCount, items: r.items.map(this.tryConvert)})))
  }

  tryConvert(item: any): TInfo{
    return this.convert ? this.convert(item) : item
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
  create(item: TNew) {
    return this._api.post(`/${this.route}`, item)
  }
  update(itemId: number, item: TNew){
    return this._api.put(`/${this.route}/${itemId}`, item)
  }
  delete(id: number) {
    return this._api.delete(`/${this.route}/${id}`)    
  }
}
