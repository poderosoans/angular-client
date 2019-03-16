import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clients'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {

   return this.http.get(this.urlEndPoint).pipe(
     map( (response) => response as Cliente[])
   );
   //return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  create(client: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, client, {headers: this.httpHeaders});
  }

  getCliente(id: number) : Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

  update(client: Cliente) : Observable<Cliente> {
      return this.http.put<Cliente>(`${this.urlEndPoint}/${client.id}`, client, {headers: this.httpHeaders});
  }

  delete(id: number) : Observable<Cliente> {
      return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
