import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { PTOreqResponse } from '../RequestPTO/req-pto.service';
import { deleteArgs } from '../../e-pto.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

export interface DelPTOReqResponse{
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteReqService {
  readonly URL = "http://localhost:8000/del-PTO-req-emp";
  constructor(private http: HttpClient) { }
  delete_PTO_req_employee(request:any): Observable<DelPTOReqResponse>{
    const reqData = {"id": request.id, "userId": request.userId};
    return this.http.post<DelPTOReqResponse>(this.URL, JSON.stringify(reqData), httpOptions).pipe(
      map(response => {
        return(response)
      })
    )
  }
}
