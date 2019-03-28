import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clients'
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient,
    private router: Router) { }

  getClientes(): Observable<Cliente[]> {

    return this.http.get(this.urlEndPoint).pipe(
      tap(response => {
        let clientes = response as Cliente[];
        console.log('ClienteService: tap 1');

        clientes.forEach(cliente => {
          console.log(cliente.name);
        })

      }),
      map(response => {
        let clientes = response as Cliente[];

        return clientes.map(cliente => {
          cliente.name = cliente.name.toUpperCase();

          //let datePipe = new DatePipe('es');
          //cliente.createdAt = datePipe.transform(cliente.createdAt, 'EEEE dd, MMMM yyyy'); //formatDate(cliente.createdAt, 'dd-MM-yyyy', 'en-US');
          return cliente;
        });
      }),
      tap(response => {
        console.log('ClienteService: tap 2');

        response.forEach(cliente => {
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
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
