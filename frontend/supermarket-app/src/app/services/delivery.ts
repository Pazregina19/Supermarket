import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiUrl =
  'http://localhost:3000/api/deliveries';

  constructor(
    private http: HttpClient
  ) {}

  getPending():
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

  accept(
    id: string
  ): Observable<any> {

    const token =
    localStorage.getItem(
      'token'
    );

    return this.http.put(

      `${this.apiUrl}/${id}/accept`,

      {},

      {
        headers: {

          Authorization:
          `Bearer ${token}`

        }
      }

    );

  }

  getMyDeliveries() {

  const token =
  localStorage.getItem(
    'token'
  );

  return this.http.get(

    `${this.apiUrl}/my`,

    {

      headers: {

        Authorization:
        `Bearer ${token}`

      }

    }

  );

}

markDelivered(
  id: string
) {

  const token =
  localStorage.getItem(
    'token'
  );

  return this.http.put(

    `${this.apiUrl}/${id}/deliver`,

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