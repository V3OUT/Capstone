import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceRecords } from '../Model/service-records';
@Injectable({
  providedIn: 'root'
})
export class ServiceRecordsService {

  private apiUrl = 'https://localhost:7014/api/ServiceRecord'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  getServiceRecords(): Observable<ServiceRecords[]> {
    return this.http.get<ServiceRecords[]>(this.apiUrl);
  }

  getService(id: number): Observable<ServiceRecords> { // Change id to number
    return this.http.get<ServiceRecords>(`${this.apiUrl}/${id}`);
  }

  createService(servicerecord: ServiceRecords): Observable<ServiceRecords> {
    return this.http.post<ServiceRecords>(this.apiUrl, servicerecord);
  }

  updateService(id: number, servicerecord: ServiceRecords): Observable<void> { // Change id to number
    return this.http.put<void>(`${this.apiUrl}/${id}`, servicerecord);
  }

  deleteService(id: number): Observable<void> { // Change id to number
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
