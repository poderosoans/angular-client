import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/shared/model/invoice';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  title: string = "Nueva Factura";
  invoice: Invoice = new Invoice();

  autoCompleteControl = new FormControl();
  products: string[] = ['Mesa', 'Tablet', 'TV LG'];
  filteredProducts: Observable<string[]>;

  constructor(private clientService: ClienteService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let clientId = +params.get('clientId');
      this.clientService.getCliente(clientId).subscribe(client => {
        this.invoice.client = client;
      });

    })

    this.filteredProducts = this.autoCompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      
  }




  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.products.filter(option => option.toLowerCase().includes(filterValue));
  }


}
