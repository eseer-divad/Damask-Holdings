import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent {
  userId: string = ''; // Initialize userId property
  userInfo: any;
  constructor(private httpClient: HttpClient) {}

  getUserInfo() {
    // Fetch user information from Django backend using the provided userId
    this.httpClient.get(`http://your-django-api-url/user-info/${this.userId}`)
      .subscribe((data: any) => {
        // Handle the response data here and update the user information in your component
        // You can store the user information in a userInfo object and display it in the HTML
      });
  }
}
