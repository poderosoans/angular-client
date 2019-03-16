import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private client: Cliente = new Cliente();
  private title: string = 'Crear Cliente';

  constructor(private clienteService: ClienteService,
              private router: Router) { }

  ngOnInit() {
  }

  public create(): void {
    this.clienteService.create(this.client).subscribe(response => {
      Swal.fire(
        'Nuevo Cliente!',
        `Cliente ${response.name} creado con éxito.`,
        'success'
      )

      this.router.navigate(['/clientes']);
    });
  }

}
