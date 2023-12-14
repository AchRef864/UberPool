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
 //hedhya kaada testaml fiha ??

  getCurrentUser(): Observable<any> {
    var id = 1 ;
    // Assuming your server provides an endpoint to get the current user details
    const currentUserUrl = `${this._baseUrl}/Users/${id}`;  // Replace with your actual endpoint
    return this._http.get(currentUserUrl);
  }
}
// ok i