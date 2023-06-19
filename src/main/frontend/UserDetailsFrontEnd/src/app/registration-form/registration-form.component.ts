import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import {throwError} from "rxjs";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // Add more form fields as needed
    });
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }
    // console.log('Submitted');

    // Prepare the headers to include the Content-Type
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    // Submit the form data to your Spring Boot backend
    this.http.post('http://localhost:8080/api/users', JSON.stringify(this.registrationForm.value), httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Handle any errors
          console.error('Error registering user:', error);
          return throwError(error); // Return an observable with the error
        })
      )
      .subscribe(response => {
        // Handle the response from the backend
        console.log('User registered successfully:', response);
      });
  }


}
