import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';
import { Region } from '../model/region';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clients'
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient,
    private router: Router) { }

  private isNotAuthorized(e): boolean {
    if(e.status == 401 || e.status == 403) { // 401: Unauthorized => No autorizado | 403: Forbidden => Recurso prohibido
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones').pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
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
    return this.http.post(this.urlEndPoint, client, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if(this.isNotAuthorized(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        if(this.isNotAuthorized(e)) {
          return throwError(e);
        }

        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);

      })
    );
  }

  update(client: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${client.id}`, client, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if(this.isNotAuthorized(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if(this.isNotAuthorized(e)) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
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

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
    
  }

}
