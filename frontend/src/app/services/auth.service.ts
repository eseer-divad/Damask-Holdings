import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  userID: string;
  isAdmin: boolean;
  firstname: string;
  middlename: string;
  lastname: string;
  dob: string;
  routingnum: string;
  accountnum: string;
  streetaddress: string;
  state: string;
  zipcode: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api_url = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<LoginResponse>(
      `${this.api_url}val_login`,
      { username, password },
      httpOptions
    );
  }

  logout(): void {
    localStorage.removeItem('userID');
  }

  storeUserInfo(userInfo: LoginResponse): void {
    localStorage.setItem('userID', JSON.stringify(userInfo));
  }
}
