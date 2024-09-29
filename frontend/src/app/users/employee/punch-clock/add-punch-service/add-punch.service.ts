import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

export interface punchResponse{
  employeeid: string;
  punchid: string;
  timepunch: string;
}

class punchdata{
  employeeid: string;
  punchid: string;
  timepunch: string;

  constructor(e_id:string, p_id:string, d_T:string){
    this.employeeid = e_id;
    this.punchid = p_id;
    this.timepunch = d_T;
  }
}

@Injectable({
  providedIn: 'root'
})

export class AddPunchService {
  readonly URL = "http://localhost:8000/timepunch";
  punch_data!: punchdata;

  private punchInfoSource = new BehaviorSubject<punchResponse | null>(null);
  punch$ = this.punchInfoSource.asObservable(); 

  constructor(private http: HttpClient) { }

  punch_attempt(creds: any): Observable<punchResponse>{
    return this.http.post<punchResponse>(this.URL, creds, httpOptions).pipe(
      map(response => {
        console.log("punch response", response);
        this.punchInfoSource.next(response);
        localStorage.setItem('punchID', response.punchid);
        localStorage.setItem('employeeID', response.employeeid);
        localStorage.setItem('dateTime', response.timepunch);
        return response;
      })
    )
  }

  getPunchIDFromLocalStorage(): string | null {
    return localStorage.getItem('punchID');
  }
  clearPunchIDFromLocalStorage(): void {
    localStorage.removeItem('unchID');
    this.punchInfoSource.next(null);
  }
  getEmployeeIDFromLocalStorage(): string | null {
    return localStorage.getItem('employeeID');
  }
  clearEmployeeIDFromLocalStorage(): void {
    localStorage.removeItem('employeeID');
    this.punchInfoSource.next(null);
  }
  getDateTimeFromLocalStorage(): string | null {
    return localStorage.getItem('dateTime');
  }
  clearDateTimeFromLocalStorage(): void {
    localStorage.removeItem('dateTime');
    this.punchInfoSource.next(null);
  }
}

