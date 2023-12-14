import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _baseUrl = 'http://localhost:3030';


  constructor(private _http: HttpClient) { }

  search(rides: any): Observable<any> {
    const url = `${this._baseUrl}/Rides/location`;
    return this._http.post(url, rides);

  }
}
