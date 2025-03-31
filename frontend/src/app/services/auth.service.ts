import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../env';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.BACKEND_URL}auth`;

  constructor(private http: HttpClient) {}

  login(usernameOrEmail: string, password: string, role: string) {
    return this.http.post(`${this.baseUrl}/login`, { usernameOrEmail, password, role });
  }

  register(fullName: string, username: string, email: string, password: string, confirmPassword: string) {
    return this.http.post(`${this.baseUrl}/register`, { fullName, username, email, password, confirmPassword });
  }
}
