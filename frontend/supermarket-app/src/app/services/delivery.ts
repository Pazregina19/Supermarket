import { Injectable }from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  apiUrl =
  'http://localhost:3000/api/deliveries';

  constructor(
    private http: HttpClient
  ) {}

  getAvailable():
  Observable<any> {

    return this.http.get<any>(
      this.apiUrl,
      this.getHeaders()
    );

  }

  accept(
    id: string
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/accept/${id}`,

      {},

      this.getHeaders()

    );

  }

  updateStatus(
    id: string,
    status: string
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/status/${id}`,

      { status },

      this.getHeaders()

    );

  }

  myDeliveries():
  Observable<any> {

    return this.http.get<any>(

      `${this.apiUrl}/my-deliveries`,

      this.getHeaders()

    );

  }

  getHeaders() {

    const token =
    localStorage.getItem('token');

    return {

      headers:
      new HttpHeaders({

        Authorization:
        `Bearer ${token}`

      })

    };

  }

}