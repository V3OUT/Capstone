import { Injectable } from '@angular/core';
import { Customers } from '../Model/customers';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiUrl = 'https://localhost:7014/api/Customers'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customers[]> {
    return this.http.get<Customers[]>(this.apiUrl);
  }

  getCustomer(id: number): Observable<Customers> {
    return this.http.get<Customers>('${this.apiUrl}/${id}');
  }

  createCustomer(customer: Customers): Observable<Customers> {
    return this.http.post<Customers>(this.apiUrl, customer);
  }

  updateCustomer(id: number, customer: Customers): Observable<void> {
    return this.http.put<void>('${this.apiUrl}/${id}', customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>('${this.apiUrl}/${id}');
  }
}