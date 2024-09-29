import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export interface LoginResponse {
  userID: string;
  isAdmin: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoginSService {
  readonly URL = "http://localhost:8000/val_login";

  private userIDSource = new BehaviorSubject<string | null>(null);
  userID$ = this.userIDSource.asObservable();

  constructor(private http: HttpClient) { }

  login_attempt(creds: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.URL, creds, httpOptions).pipe(
      map(response => {
        console.log("Login response:", response);
        this.userIDSource.next(response.userID);
        if (response.userID !== "-1") {
          localStorage.setItem('userID', response.userID.toString());
          this.userIDSource.next(response.userID.toString());
        }
        console.log(this.userID$);
        return response;
      })
    );
  }
  getUserIDFromLocalStorage(): string | null {
    return localStorage.getItem('userID');
  }
  clearUserIDFromLocalStorage(): void {
    localStorage.removeItem('userID');
    this.userIDSource.next(null);
  }


}

