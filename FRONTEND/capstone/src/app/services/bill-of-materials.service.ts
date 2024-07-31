import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BillOfMaterial } from '../Model/bill-of-material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillOfMaterialsService {
  private apiUrl = 'https://localhost:7014/api/BillOfMaterials';

  constructor(private http: HttpClient) {}

  getBill(): Observable<BillOfMaterial[]> {
    return this.http.get<BillOfMaterial[]>(this.apiUrl);
  }

  getBillOM(id: number): Observable<BillOfMaterial> {
    return this.http.get<BillOfMaterial>(`${this.apiUrl}/${id}`);
  }

  createBill(bill: BillOfMaterial): Observable<BillOfMaterial> {
    return this.http.post<BillOfMaterial>(this.apiUrl, bill);
  }

  updateBill(id: number, bill: BillOfMaterial): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, bill);
  }

  deleteBill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
