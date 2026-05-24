import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/login`,
      { email, password },
      httpOptions
    ).pipe(

      map((response: any) => {

        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('username', response.username);

        return response;

      })

    );

  }

  register(userData: any): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/register`,
      userData,
      httpOptions
    );

  }

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');

  }

  loggedIn(): boolean {

    return localStorage.getItem('token') != null;

  }

  getRole(): string | null {

    return localStorage.getItem('role');

  }

  isClient(): boolean {

    return this.getRole() === 'client';

  }

  isSupermarket(): boolean {

    return this.getRole() === 'supermarket';

  }

  isCourier(): boolean {

    return this.getRole() === 'courier';

  }

  isAdmin(): boolean {

    return this.getRole() === 'admin';

  }

  getProfile(): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/me`
    );

  }

}