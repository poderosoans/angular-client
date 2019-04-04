import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from 'src/app/shared/services/modal.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
  private imageSelected: File = null; // Atributo propio de la clase lo dejamos como privado
  progress: number = 0;

  constructor(private clienteService: ClienteService,
              private modalService: ModalService,
              private authService: AuthService) { }

  ngOnInit() {

  }

  selectImage(event) {
    this.imageSelected = event.target.files[0];
    this.progress = 0;
    console.log(this.imageSelected);

    if(this.imageSelected == null) return;
    if(this.imageSelected.type.indexOf('image') < 0) {
      Swal.fire('Error seleccionar imagen:', 'El archivo debe ser una imagen.', 'error');
      this.imageSelected = null;
    }

  }

  uploadFile() {
    if(!this.imageSelected) {
      Swal.fire('Error Upload:', 'Debe seleccionar una imagen.', 'error');
    } else {

    this.clienteService.uploadImage(this.imageSelected, this.cliente.id).subscribe( event => {
      if(event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round((event.loaded/event.total)*100);
      }else if(event.type === HttpEventType.Response) {
        let response: any = event.body;
        this.cliente = response.cliente as Cliente;
        this.modalService.notifyUpload.emit(this.cliente);
        Swal.fire("La foto se ha subido completamente!", response.mensaje, 'success');
        this.imageSelected = null;
      }
      
    });

    }

  }

  closeModal(client: Cliente) {
    this.modalService.closeModal();
    this.imageSelected = null;
    this.progress = 0;
  }

}
