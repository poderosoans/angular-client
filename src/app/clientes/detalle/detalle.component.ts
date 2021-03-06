import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from 'src/app/shared/services/modal.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Invoice } from 'src/app/shared/model/invoice';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

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
              public modalService: ModalService,
              public authService: AuthService,
              private invoiceService: InvoiceService) { }

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

  delete(invoice: Invoice): void {
  
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: `¿Seguro que desea eliminar la factura ${invoice.description}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {
        this.invoiceService.delete(invoice.id).subscribe( response => {
          this.cliente.invoices = this.cliente.invoices.filter(inv => inv != invoice);
          
          swalWithBootstrapButtons.fire(
            'Factura eliminado!',
            `Factura ${invoice.description} eliminado con éxito.`,
            'success'
          )
          
        })
        
      } 
      
    })

  }

}
