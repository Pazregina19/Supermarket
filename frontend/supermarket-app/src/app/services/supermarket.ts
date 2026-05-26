import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupermarketService {

  private apiUrl =
    'http://localhost:3000/api/supermarkets';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<any> {

    return this.http.get<any>(
      this.apiUrl
    );

  }

  getById(id: string): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );

  }

  create(
    supermarketData: any
  ): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      supermarketData
    );

  }

  approve(id: string): Observable<any> {

  const token =
    localStorage.getItem('token');

  return this.http.put<any>(

    `${this.apiUrl}/${id}/approve`,

    {},

    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }

  );

}

}