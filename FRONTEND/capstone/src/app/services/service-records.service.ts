import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceRecords } from '../Model/service-records';

@Injectable({
  providedIn: 'root'
})
export class ServiceRecordsService {
  private apiUrl = 'https://localhost:7014/api/ServiceRecord'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getServiceRecords(): Observable<ServiceRecords[]> {
    return this.http.get<ServiceRecords[]>(this.apiUrl);
  }

  getService(id: number): Observable<ServiceRecords> {
    return this.http.get<ServiceRecords>(`${this.apiUrl}/${id}`);
  }

  createService(serviceRecord: ServiceRecords): Observable<ServiceRecords> {
    return this.http.post<ServiceRecords>(this.apiUrl, serviceRecord);
  }

  updateService(id: number, serviceRecord: ServiceRecords): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, serviceRecord);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
