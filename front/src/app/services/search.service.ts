import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _baseUrl = 'http://localhost:3030';

  
  constructor(private _http: HttpClient) { }

  search(ride: any): Observable<any> {
    const url = `${this._baseUrl}/Users/search/`;
    return this._http.post(url, ride);
  }
}
