import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  cliente: Cliente;
  private imageSelected: File; // Atributo propio de la clase lo dejamos como privado

  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id');
      if(id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        });
      
      }

    });
  
  }

  selectImage(event) {
    this.imageSelected = event.target.files[0];
    console.log(this.imageSelected);
  }

  uploadFile() {
    this.clienteService.uploadImage(this.imageSelected, this.cliente.id).subscribe( cliente => {
      this.cliente = cliente;
      Swal.fire("La foto se ha subido completamente!", `La foto se ha subido con éxito: ${this.cliente.image}`, 'success');
    });

  }

}
