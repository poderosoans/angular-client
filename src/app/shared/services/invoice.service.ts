import { Injectable } from '@angular/core';
import { Invoice } from '../model/invoice';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private urlEndPoint: string = URL_BACKEND + '/api/invoices';
  constructor(private httpClient: HttpClient,
              ) { }

  getInvoice(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${this.urlEndPoint}/${id}`);
  }

  delete(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  productsFilter(term: string): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.urlEndPoint}/product-filter/${term}`);
  }

  create(invoice: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>(this.urlEndPoint, invoice);
  }

}
