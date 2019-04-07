import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/** Pass untouched request through to the next request handler. */
// https://angular.io/guide/http#intercepting-requests-and-responses
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const authToken = this.authService.token;
    if (authToken != null) { // Si es distinto de null pasa el token en la cabecera
      const authReq = req.clone({
        headers: req.headers.set('Authorization','Bearer ' + authToken)
      });
      return next.handle(authReq); // continúa con el siguiente interceptor en la pila.
    }  

    return next.handle(req);
  }
}