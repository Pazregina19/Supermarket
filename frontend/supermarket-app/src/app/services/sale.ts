import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private apiUrl =
  'http://localhost:3000/api/sales';

  constructor(
    private http: HttpClient
  ) {}

  createSale(
    saleData: any
  ): Observable<any> {

    const token =
    localStorage.getItem(
      'token'
    );

    return this.http.post(

      this.apiUrl,

      saleData,

      {
        headers: {

          Authorization:
          `Bearer ${token}`

        }
      }

    );

  }

  getSales():
  Observable<any> {

    const token =
    localStorage.getItem(
      'token'
    );

    return this.http.get(

      this.apiUrl,

      {
        headers: {

          Authorization:
          `Bearer ${token}`

        }
      }

    );

  }


}