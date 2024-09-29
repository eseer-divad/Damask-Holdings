import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError } from 'rxjs';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export interface PTOreqResponse{
  status: string;
  date: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})

export class ReqPTOService {
  readonly URL = "http://localhost:8000/Submit-pto-request";

  constructor(private http: HttpClient) { }

  submitRequest(request: any): Observable<PTOreqResponse>{
    return this.http.post<PTOreqResponse>(this.URL, request, httpOptions).pipe(
      map(response =>{
        return(response) 
      })
    )
  }
}
