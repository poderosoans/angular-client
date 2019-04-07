import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

/** Pass untouched request through to the next request handler. */
// https://angular.io/guide/http#intercepting-requests-and-responses
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(e => {
        if (e.status == 401) { // 401: Unauthorized => No autorizado | 403: Forbidden => Recurso prohibido
          if (this.authService.isAuthenticated()) {  // Verifica si el token expiró en el backend para cerrar sesión en el frontend.
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        } else if (e.status == 403) {
          Swal.fire('Acceso denegado', `Hola ${this.authService.user.username} no tienes acceso a este recurso.`, 'warning');
          this.router.navigate(['/clientes']);
        }

        return throwError(e);

      })
    );
  }
}