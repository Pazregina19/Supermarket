import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private url = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.url);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  compare(name: string): Observable<any> {
    return this.http.get(`${this.url}/compare?name=${name}`);
  }
}