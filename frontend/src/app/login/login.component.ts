// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.myForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const creds = {
      username: this.myForm.get('username')?.value,
      password: this.myForm.get('password')?.value
    };

    this.authService.login(creds.username, creds.password).subscribe(
      response => {
        if (response.userID === "-1" && response.isAdmin) {
          window.alert('Login failed! Please check your credentials.');
        } else if (response.isAdmin) {
          this.router.navigate(['/hdashboard']);
        } else {
          this.authService.storeUserInfo(response); // Store user info in localStorage
          this.router.navigate(['/edashboard']);  // Redirect to the user route
        }
      },
      error => {
        console.error('Error:', error);
        window.alert('An error occurred. Please try again.');
      }
    );
  }
}