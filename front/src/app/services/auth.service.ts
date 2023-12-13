import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl = 'http://localhost:3030';

  constructor(private _http: HttpClient) { }

  register(user: any): Observable<any> {
    const url = `${this._baseUrl}/Users`;
    return this._http.post(url, user);
  }

  login(user: any): Observable<any> {
    const loginUrl = `${this._baseUrl}/Users/login/`;
    return this._http.post(loginUrl, user);
  }
}
