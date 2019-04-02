import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Region } from 'src/app/shared/model/region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private client: Cliente = new Cliente();
  private title: string = 'Crear Cliente';
  private errors: string[];
  regiones: Region[];

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
    this.cargarRegiones();
  }

  cargarCliente() : void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id) {
        this.clienteService.getCliente(id).subscribe( response => {
          this.client = response;
        })
      }

    })
  }

  cargarRegiones() : void {
    this.clienteService.getRegiones().subscribe(regiones => {
      this.regiones = regiones;
    })
  }

  public create(): void {
    this.clienteService.create(this.client).subscribe(cliente => {
      Swal.fire(
        'Nuevo Cliente!',
        `El cliente ${cliente.name} ha sido creado con éxito.`,
        'success'
      )

      this.router.navigate(['/clientes']);
    },
    err => {
      this.errors = err.error.errors as string[];
      console.log('Cod error:', err.status);
      console.log(err.error.errors)
    });
  }

  update() : void {
    this.clienteService.update(this.client).subscribe(response => {
      Swal.fire(
        'Cliente actualizado',
        `${response.mensaje} | ${response.cliente.name}`,
        'success'
      )

      this.router.navigate(['/clientes']);
    },
    err => {
      this.errors = err.error.errors as string[];
      console.log('Cod error:', err.status);
      console.log(err.error.errors)
    });
  }
  
  compareRegion(o1: Region, o2: Region) : boolean {
    // strict mode === undefined
    /* // Comparación para añadir opción por defecto con texto seleccionar
    if( o1 == undefined && o2 === undefined) {
      return true;
    }
    */
    return o1 == null || o2 == null ? false: o1.id === o2.id;
  }

}
