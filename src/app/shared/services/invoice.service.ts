import { Injectable } from '@angular/core';
import { Invoice } from '../model/invoice';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private urlEndPoint: string = 'http://localhost:8080/api/invoices';
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

}
