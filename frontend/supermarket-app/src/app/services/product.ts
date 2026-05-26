import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private url = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  compare(name: string) {
    return this.http.get<any[]>(`${this.url}/compare?name=${name}`);
  }
}
