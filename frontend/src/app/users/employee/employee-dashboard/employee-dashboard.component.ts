// employee-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  userInfo: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Assuming you have a user object stored in local storage after login
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
  }
}