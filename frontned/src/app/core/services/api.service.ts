import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  base_url: string

  constructor(private http: HttpClient) {
    this.base_url = environment.api_base_url
    HttpParams
  }

  private onErrors() {
    return catchError((error) => throwError(error.error));
  }

  get(path: string, params: Record<string, any> = {}): Observable<any> {
    Object.keys(params).forEach(key => !params[key] ? delete params[key] : {});

    return this.http.get(`${this.base_url}${path}`, { 
      params: new HttpParams({fromObject: params})
    }).pipe(this.onErrors());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${this.base_url}${path}`, JSON.stringify(body))
      .pipe(this.onErrors());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.base_url}${path}`, JSON.stringify(body))
      .pipe(this.onErrors());
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.base_url}${path}`)
      .pipe(this.onErrors());
  }
}