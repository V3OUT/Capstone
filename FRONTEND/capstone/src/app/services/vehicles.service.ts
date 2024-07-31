import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicles } from '../Model/vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private apiUrl = 'https://localhost:7014/api/Vehicle';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicles[]> {
    return this.http.get<Vehicles[]>(this.apiUrl);
  }

  getVehicle(id: number): Observable<Vehicles> {
    return this.http.get<Vehicles>('${this.apiUrl}/${id}');
  }

  addVehicle(vehicle: Vehicles): Observable<Vehicles> {
    return this.http.post<Vehicles>(this.apiUrl , vehicle);
  }

  updateVehicle(id: number, vehicle: Vehicles): Observable<Vehicles> {
    return this.http.put<Vehicles>('${this.apiUrl}/${id}', vehicle);
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>('${this.apiUrl}/${id}');
  }
}
