import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoices } from '../Model/invoices';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private apiUrl = 'https://localhost:7014/api/Invoices';

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<Invoices[]> {
    return this.http.get<Invoices[]>(this.apiUrl);
  }

  getInvoice(id: number): Observable<Invoices> {
    return this.http.get<Invoices>(`${this.apiUrl}/${id}`);
  }

  createInvoice(invoice: Invoices): Observable<Invoices> {
    return this.http.post<Invoices>(this.apiUrl, invoice);
  }

  updateInvoice(id: number, invoice: Invoices): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, invoice);
  }

  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
