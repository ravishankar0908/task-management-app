import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token");
    let authRequest = request;
    if(token){
      authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
    }
    
    return next.handle(authRequest);
  }
}
