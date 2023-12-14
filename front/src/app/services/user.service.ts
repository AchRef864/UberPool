// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'http://localhost:3030'; // Adjust the URL accordingly

    constructor(private http: HttpClient) { }

    getUserById(userId: string): Observable<any> {
        const url = `${this.baseUrl}/Users/${userId}`;
        return this.http.get(url);

    }
}
