import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/shared/model/invoice';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, flatMap } from 'rxjs/operators';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { Product } from 'src/app/shared/model/product';

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
  filteredProducts: Observable<Product[]>;

  constructor(private clientService: ClienteService,
              private activatedRoute: ActivatedRoute,
              private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let clientId = +params.get('clientId');
      this.clientService.getCliente(clientId).subscribe(client => {
        this.invoice.client = client;
      });

    })

    this.filteredProducts = this.autoCompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.name),
        flatMap(value => value ? this._filter(value) : [])
      );
      
  }




  private _filter(value: string): Observable<Product[]> {

    const filterValue = value.toLowerCase();
    return this.invoiceService.productsFilter(filterValue);
  }

  showName(product?: Product): string | undefined {
    return product ? product.name: undefined;
  }


}
