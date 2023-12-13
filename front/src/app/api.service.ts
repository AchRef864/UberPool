// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3030'; // Replace with your Express server URL

  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<any> {
    const url = `${this.baseUrl}/Users`;
    return this.http.post(url, user);
  }
  // ... (existing code)
  loginDriver(user: any): Observable<any> {
    const url = `${this.baseUrl}/Users/login/driver`;
    return this.http.post(url, user);
}

loginPassenger(user: any): Observable<any> {
    const url = `${this.baseUrl}/Users/login/passenger`;
    return this.http.post(url, user);
}

}
