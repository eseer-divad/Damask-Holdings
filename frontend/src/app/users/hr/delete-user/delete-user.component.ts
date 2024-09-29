import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent {
  deleteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.deleteForm = this.fb.group({
      ssn: ['', Validators.required],
      userID: ['', Validators.required],
    });
  }

  onDelete() {
    if (this.deleteForm.valid) {
      const formData = this.deleteForm.value;

      // Send DELETE request to Django
      this.httpClient
        .delete<Response>('http://localhost:8000/delete-account/', {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          body: formData,
        })
        .subscribe(
          (response) => {
            if (response) {
              this.router.navigate(['/hdashboard']);
            }
          },
          (error) => {
            console.log('Error:', error);
          }
        );
    }
  }
}

@NgModule({
  declarations: [DeleteUserComponent],
  imports: [ReactiveFormsModule, CommonModule],
})
export class DeleteUserModule {}