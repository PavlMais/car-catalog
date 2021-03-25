import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const request = req.clone({
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    });

    return next.handle(request);
  }
}
