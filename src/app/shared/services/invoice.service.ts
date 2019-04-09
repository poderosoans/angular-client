import { Injectable } from '@angular/core';
import { Invoice } from '../model/invoice';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private urlEndPoint: string = 'http://localhost:8080/api/invoices';
  constructor(private httpClient: HttpClient,
              ) { }

  getInvoice(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${this.urlEndPoint}/${id}`)
  }

}
