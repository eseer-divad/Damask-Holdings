import { Component, OnInit } from '@angular/core';
import { LoginSService } from 'src/app/login/loginService/login-s.service';
import { AddPunchService } from './add-punch-service/add-punch.service';
import { ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-punch-clock',
  templateUrl: './punch-clock.component.html',
  styleUrls: ['./punch-clock.component.css']
})
export class PunchClockComponent implements OnInit {
  currentTime!: string;
  currentDate!: string;
  currentDay!: string;
  submit_Time!: string;
  userID: string | null = null;
  userInfo: any;

  punchID: string | null = null;
  EmployeeID: string | null = null;
  dateTime: string | null = null;

  constructor(private loginService: LoginSService, private addPunchService: AddPunchService, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);


    const currentUserString = localStorage.getItem('userID'); // Update to 'userID'
    if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    this.userInfo = {
      userID: currentUser.userID,
      isAdmin: currentUser.isAdmin,
      firstname: currentUser.firstname,
      middlename: currentUser.middlename,
      lastname: currentUser.lastname,
      dob: currentUser.dob,
      routingnum: currentUser.routingnum,
      accountnum: currentUser.accountnum,
      streetaddress: currentUser.streetaddress,
      state: currentUser.state,
      zipcode: currentUser.zipcode,
      token: currentUser.token
    };
  } else {
    // for debugging
    console.log(currentUserString)
    console.error('No valid user information found.');
  }
    this.userID = this.userInfo.userID;
    this.punchID = this.addPunchService.getPunchIDFromLocalStorage();
    this.EmployeeID = this.addPunchService.getEmployeeIDFromLocalStorage();
    this.dateTime = this.addPunchService.getDateTimeFromLocalStorage();
  }

  updateTime() {
    const time = new Date();
    this.currentTime = time.toLocaleTimeString();
    this.currentDate = time.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    this.currentDay = time.toLocaleDateString(undefined, { weekday: 'long' });
    this.submit_Time = time.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  }

  alertModalPopUp() {
    this.elementRef.nativeElement.querySelector('.pop-up').style.display = "flex";
    this.elementRef.nativeElement.querySelector('.pop-up-child').style.display = "block";
  }

  alertModalClose() {
    this.elementRef.nativeElement.querySelector('.pop-up').style.display = "none";
    this.elementRef.nativeElement.querySelector('.pop-up-child').style.display = "none";
  }

  test() {
    this.alertModalPopUp();
  }

  onSubmit() {
    const time = new Date();
    const formattedTime = `${time.getFullYear()}-${String(time.getMonth() + 1).padStart(2, '0')}-${String(time.getDate()).padStart(2, '0')} ${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')}`;

    const creds = {
      userID: this.userID,
      dateTime: formattedTime
    };

    this.addPunchService.punch_attempt(creds).subscribe(
      response => {
        console.log("Success:", response);
        this.punchID = response.punchid;
        this.EmployeeID = response.employeeid
        this.dateTime = response.timepunch;
        this.alertModalPopUp();
      },
      error => {
        console.error('Error:', error);
        let errorMessage = 'An error occurred while trying to record the punch.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.error}`;
        }
        alert(errorMessage);
      }
    );
  }

}
