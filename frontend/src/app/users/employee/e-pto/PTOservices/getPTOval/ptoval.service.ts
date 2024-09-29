import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError } from 'rxjs';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export interface PTOValResponse {
  PTO: number;
}

@Injectable({
  providedIn: 'root'
})
export class PTOValService {
  readonly URL = "http://localhost:8000/pto_qty";
  private PTOSource = new BehaviorSubject<number | null>(null);
  PTO$ = this.PTOSource.asObservable();

  constructor(private http: HttpClient) { }

  getPTO(userID: string): Observable<PTOValResponse> {
    return this.http.post<PTOValResponse>(this.URL, {'userId': userID }, httpOptions).pipe(
      map(response => {
        this.PTOSource.next(response.PTO);
        localStorage.setItem("PTO_val", response.PTO.toString());
        return response;
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Error in getPTO'));
      })
    );
  }
}
