import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/shared/model/invoice';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  title: string = "Nueva Factura";
  invoice: Invoice = new Invoice();
  constructor(private clientService: ClienteService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let clientId = +params.get('clientId');
      this.clientService.getCliente(clientId).subscribe(client => {
        this.invoice.client = client;
      });

    })
  }

}
