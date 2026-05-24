import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupermarketService {

  private apiUrl = 'http://localhost:3000/api/supermarkets';

  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      data
    );

  }

  getAll(): Observable<any> {

    return this.http.get<any>(
      this.apiUrl
    );

  }

  getOne(id: string): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );

  }

  approve(id: string): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/${id}/approve`,
      {}
    );

  }

}