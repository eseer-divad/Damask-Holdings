import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError } from 'rxjs';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': "application/json"
  })
};

export interface PTOApprovalResponse{
  status: string;
}

@Injectable({
  providedIn: 'root'
})

export class approvePTORequest {
  readonly URL = "http://localhost:8000/set-pto-request";
  constructor(private http: HttpClient) { }
  setReqs(request: any): Observable<PTOApprovalResponse>{
    const requestData = { "eid" : request.eid, "id" : request.id, "status" : request.status};
    return this.http.post<PTOApprovalResponse>(this.URL, JSON.stringify(requestData), httpOptions).pipe(
      map(response =>{
        console.log(response)
        return(response)
      })
    )
  }
}
