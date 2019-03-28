import { Component, OnInit } from '@angular/core';
import { Cliente } from '../shared/model/cliente';
import { ClienteService } from '../shared/services/cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().pipe(
      tap(data => {  // Tap es un VOID nos sirve para trabajar, para realizar algún tipo de tarea.
        console.log('ClienteComponent: tap 3');
        // this.clientes = data;
        data.forEach(cliente => {
          console.log(cliente.name);
        })
      })

    ).subscribe(data => {
      this.clientes = data;
    });
  }

  delete(cliente: Cliente): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.name} ${cliente.lastname}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe( response => {
          this.clientes = this.clientes.filter(cli => cli != cliente);
          
          swalWithBootstrapButtons.fire(
            'Cliente eliminado!',
            `Cliente ${cliente.name} eliminado con éxito.`,
            'success'
          )
          
        })
        
      } 
      
    })
  }

}
