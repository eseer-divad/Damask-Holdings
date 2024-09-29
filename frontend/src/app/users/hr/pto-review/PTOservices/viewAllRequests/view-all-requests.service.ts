import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { PTOreqResponse } from 'src/app/users/employee/e-pto/PTOservices/RequestPTO/req-pto.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': "application/json"
  })
};

export interface viewPTOreqsResponse{
  status: string;
  date: string;
  id: string;
  eid: string;
  fullID: string;
  fullEID: string;
}

@Injectable({
  providedIn: 'root'
})
export class ViewAllRequestsService {
  readonly URL = "http://localhost:8000/all-pto-requests";
  constructor(private http: HttpClient) { }
  getReqs(request: any): Observable<viewPTOreqsResponse>{
    const requestData = { 'userId': request};
    return this.http.post<viewPTOreqsResponse>(this.URL, JSON.stringify(requestData), httpOptions).pipe(
      map(response =>{
        console.log(response)
        return(response)
      })
    )
  }
}
