import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClientes(): Observable<Cliente[]> {
    let clientes: Cliente[] = [
      { id: 1, nombre: 'Roger', apellido: 'Poma', email: 'roger@gmail.com', createdAt: '2017_11-20'},
      { id: 1, nombre: 'Juan', apellido: 'Torres', email: 'juan@gmail.com', createdAt: '2017_10-20'},
      { id: 1, nombre: 'Pedro', apellido: 'Martinez', email: 'pedro@gmail.com', createdAt: '2017_12-20'},
      { id: 1, nombre: 'Alberto', apellido: 'Rodriguez', email: 'alberto@gmail.com', createdAt: '2017_09-20'},
      { id: 1, nombre: 'María', apellido: 'Tasso', email: 'maria@gmail.com', createdAt: '2017_01-20'},
      { id: 1, nombre: 'Juana', apellido: 'Navarro', email: 'juana@gmail.com', createdAt: '2017_11-20'},
      { id: 1, nombre: 'Gavilan', apellido: 'Puma', email: 'gavilan@gmail.com', createdAt: '2017_07-20'}
    ];
    return of(clientes);
  }
}
