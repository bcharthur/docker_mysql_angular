// items.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private baseUrl = 'http://localhost:8080/api/items'; // => API REST

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  createItem(item: any): Observable<any> {
    return this.http.post(this.baseUrl, item);
  }

  // EDITER (PUT /api/items/{id})
  updateItem(id: number, item: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/items/${id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
