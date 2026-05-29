import { HttpClient, HttpHeaders } from '@angular/common/http';  // ← adicionar HttpHeaders
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupermarketService {

  private apiUrl = 'http://localhost:3000/api/supermarkets';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

create(supermarketData: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  return this.http.post(this.apiUrl, supermarketData, { headers });
}

  approve(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put<any>(
      `${this.apiUrl}/${id}/approve`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  getMine(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${this.apiUrl}/mine`, { headers });  // ← this.apiUrl, não this.url
  }

}