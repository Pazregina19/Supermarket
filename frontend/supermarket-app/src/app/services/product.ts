import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

addProduct(productData: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  return this.http.post(this.url, productData, { headers });
}

  compare(name: string): Observable<any> {
    return this.http.get(`${this.url}/compare?name=${name}`);
  }
}