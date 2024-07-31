import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workitems } from '../Model/workitems';
@Injectable({
  providedIn: 'root'
})
export class WorkitemsService {

  private apiUrl = 'https://localhost:7014/api/WorkItems'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  getWorkItems(): Observable<Workitems[]> {
    return this.http.get<Workitems[]>(this.apiUrl);
  }

  getitem(id: number): Observable<Workitems> { // Change id to number
    return this.http.get<Workitems>(`${this.apiUrl}/${id}`);
  }

  createitem(items: Workitems): Observable<Workitems> {
    return this.http.post<Workitems>(this.apiUrl, items);
  }

  updateitem(id: number, items: Workitems): Observable<void> { // Change id to number
    return this.http.put<void>(`${this.apiUrl}/${id}`, items);
  }

  deleteitem(id: number): Observable<void> { // Change id to number
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
