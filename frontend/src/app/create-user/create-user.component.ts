import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { v4 } from 'uuid';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  accountForm: FormGroup;
  errorMessage!: string; // Add an error message property

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.accountForm = this.fb.group({
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: [''],
      ssn: [''],
      dob: [''],
      streetaddress: [''],
      state: [''],
      routingnum: [''],
      accountnum: [''],
      zipcode: [''],
      isadmin: [false],
    });
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const uniqueID = v4();
      const formData = { ...this.accountForm.value, userid: uniqueID };
      // Set headers to indicate JSON data
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      // Send POST request to Django
      this.httpClient
        .post('http://localhost:8000/create-account/', formData, {
          headers,
        })
        .pipe(
          catchError((error) => {
            // Handle errors here
            this.errorMessage = error.error.errors; // Assign the error message
            throw error;
          })
        )
        .subscribe(
          (response) => {
            // Handle the successful response here
            console.log('Success:', response);

            // Navigate to the '/edashboard' route on success
            this.router.navigate(['/edashboard']);
          },
          (error) => {
            // Handle the error here if needed
            console.log('Error:', error);
          }
        );
    }
  }
}
