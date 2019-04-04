import { Component, OnInit } from '@angular/core';
import { Cliente } from '../shared/model/cliente';
import { ClienteService } from '../shared/services/cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../shared/services/modal.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clientSelected: Cliente;

  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalService,
              private authService: AuthService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe ( params => {
      let page: number = +params.get('page');

      if(!page) { page = 0 }

      this.clienteService.getClientes(page).pipe(
        tap(data => {  // Tap es un VOID nos sirve para trabajar, para realizar algún tipo de tarea.
          console.log('ClienteComponent: tap 3');
          // this.clientes = data;
          (data.content as Cliente[]).forEach(cliente => {
            console.log(cliente.name);
          })
        })
  
      ).subscribe(data => {
        this.clientes = data.content as Cliente[];
        this.paginador = data;
      });

    });

    this.modalService.notifyUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if(cliente.id == clienteOriginal.id) {
          clienteOriginal.image = cliente.image;
        }
        return clienteOriginal;
      });
    })
   
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
          //this.clientes = this.clientes.filter(cli => cli != cliente);
          this.clienteService.getClientes(0).subscribe(response => {
            this.clientes = response.content as Cliente[];
            this.paginador = response;
          });
          
          swalWithBootstrapButtons.fire(
            'Cliente eliminado!',
            `Cliente ${cliente.name} eliminado con éxito.`,
            'success'
          )
          
        })
        
      } 
      
    })
  }

  openModal(client: Cliente) {
    this.clientSelected = client;
    this.modalService.openModal();
  }

}
