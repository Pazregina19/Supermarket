import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';

const httpOptions = {

  headers:
  new HttpHeaders({

    'Content-Type':
    'application/json'

  })

};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
  'http://localhost:3000/api/auth';

  constructor(
    private http: HttpClient
  ) {}

  login(
    email: string,
    password: string
  ): Observable<any> {

    return this.http.post<any>(

      `${this.apiUrl}/login`,

      {
        email,
        password
      },

      httpOptions

    ).pipe(

      map((response: any) => {

        localStorage.setItem(

          'token',

          response.token

        );

        localStorage.setItem(

          'role',

          response.role

        );

        localStorage.setItem(

          'username',

          response.username

        );

        return response;

      })

    );

  }

  register(
    userData: User
  ): Observable<User> {

    return this.http.post<User>(

      `${this.apiUrl}/register`,

      userData,

      httpOptions

    );

  }

  registerCourier(
    userData: User
  ): Observable<User> {

    userData.role =
    'courier';

    return this.http.post<User>(

      `${this.apiUrl}/register`,

      userData,

      httpOptions

    );

  }

  registerSupermarket(
    userData: User
  ): Observable<User> {

    userData.role =
    'supermarket';

    return this.http.post<User>(

      `${this.apiUrl}/register`,

      userData,

      httpOptions

    );

  }

  registerAdmin(
    userData: User
  ): Observable<User> {

    userData.role =
    'admin';

    return this.http.post<User>(

      `${this.apiUrl}/register`,

      userData,

      httpOptions

    );

  }

  logout(): void {

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'role'
    );

    localStorage.removeItem(
      'username'
    );

  }

  logedIn(): boolean {

    return localStorage.getItem(
      'token'
    ) != null;

  }

  getRole(): string | null {

    return localStorage.getItem(
      'role'
    );

  }

  isClient(): boolean {

    return this.getRole() ===
    'client';

  }

  isSupermarket(): boolean {

    return this.getRole() ===
    'supermarket';

  }

  isCourier(): boolean {

    return this.getRole() ===
    'courier';

  }

  isAdmin(): boolean {

    return this.getRole() ===
    'admin';

  }

  getUsername(): string | null {

    return localStorage.getItem(
      'username'
    );

  }

  getProfile():
  Observable<any> {

    const token =
    localStorage.getItem(
      'token'
    );

    return this.http.get(

      'http://localhost:3000/api/auth/me',

      {
        headers: {

          Authorization:
          `Bearer ${token}`

        }
      }

    );

  }

}