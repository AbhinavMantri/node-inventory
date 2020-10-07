import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  preUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem("access-token");
  }
  
  login(email: string, password: string): Observable<any> {
    const url = `${this.preUrl}/auth`;
    return this.http.post<User>(url, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    const url = `${this.preUrl}`;
    return this.http.post<User>(url, { name, email, password });
  }
}
