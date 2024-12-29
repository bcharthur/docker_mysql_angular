import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private baseUrl = 'http://localhost:8080/api/items'; // <-- /api/items

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<any> {
    // => GET /api/items
    return this.http.get(this.baseUrl);
  }

  createItem(item: any): Observable<any> {
    // => POST /api/items
    return this.http.post(this.baseUrl, item);
  }

  updateItem(id: number, item: any): Observable<any> {
    // => PUT /api/items/{id} (si vous implémentez)
    return this.http.put(`${this.baseUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    // => DELETE /api/items/{id}
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
