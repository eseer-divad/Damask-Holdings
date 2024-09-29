import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { PTOreqResponse } from '../RequestPTO/req-pto.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': "application/json"
  })
};

export interface viewPTOreqsResponse{
  id: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ViewRequestsService {
  readonly URL = "http://localhost:8000/my-pto-requests";
  constructor(private http: HttpClient) { }
  getReqs(request: any): Observable<viewPTOreqsResponse>{
    const requestData = { 'userId': request};
    //window.alert('User ID is: ' + requestData);
    return this.http.post<PTOreqResponse>(this.URL, JSON.stringify(requestData), httpOptions).pipe(
      map(response =>{
        return(response)
      })
    )
  }
}
