import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Region } from '../model/region';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = URL_BACKEND +'/api/clients'

  constructor(private http: HttpClient,
    private router: Router) { }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

  getClientes(page: number): Observable<any> {

    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {

        console.log('ClienteService: tap 1');

        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.name);
        })

      }),
      map(response => {

        (response.content as Cliente[]).map(cliente => {
          cliente.name = cliente.name.toUpperCase();

          //let datePipe = new DatePipe('es');
          //cliente.createdAt = datePipe.transform(cliente.createdAt, 'EEEE dd, MMMM yyyy'); //formatDate(cliente.createdAt, 'dd-MM-yyyy', 'en-US');
          return cliente;
        });
        return response;
      }),
      tap(response => {
        console.log('ClienteService: tap 2');

        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.name);
        })

      })


    );

    //return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  create(client: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, client).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        if (e.status == 400) { // Validacion de formulario status = 400
          return throwError(e);
        }

        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
        }
        return throwError(e);

      })
    );
  }

  update(client: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${client.id}`, client).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  uploadImage(file: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);

  }

}