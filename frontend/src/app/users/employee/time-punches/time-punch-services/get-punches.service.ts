import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError } from 'rxjs';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export interface prevPunches{
  id: string,
  p_date: string,
  day: string,
  p_time: string
}

@Injectable({
  providedIn: 'root'
})

export class GetPunchesService {
  readonly URL = "http://localhost:8000/my_punches"
  constructor(private http: HttpClient) { }
  getMyPunches(request: any): Observable<prevPunches>{
    const requestData = {'userId': request};
    return this.http.post<prevPunches>(this.URL, JSON.stringify(requestData), httpOptions).pipe(
      map(response =>{
        return(response)
      })
    )
  }
}
