import { Injectable }
from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrl =
  'http://localhost:3000/api/sales';

  constructor(
    private http: HttpClient
  ) {}

  getOrders():
  Observable<any> {

    return this.http.get<any>(

      this.apiUrl,

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