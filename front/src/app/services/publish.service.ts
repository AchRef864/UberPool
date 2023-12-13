import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublishService {

  private _baseUrl = 'http://localhost:3030';

  constructor(private _http: HttpClient) { }

  publish(ride: any): Observable<any> {
    const url = `${this._baseUrl}/Rides/`;
    return this._http.post(url, ride);
  }
}
