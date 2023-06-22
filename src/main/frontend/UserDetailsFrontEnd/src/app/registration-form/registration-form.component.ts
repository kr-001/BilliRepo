import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LocationService } from '../location.service';
import { Location } from '../location.model';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;
  locations: Location[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private locationService: LocationService
  ) {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      location: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.locationService.getLocations()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error retrieving locations:', error);
          return throwError(error);
        })
      )
      .subscribe((response: Location[]) => {
        this.locations = response;
      });
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.post('http://localhost:8080/api/users', JSON.stringify(this.registrationForm.value), httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error registering user:', error);
          return throwError(error);
        })
      )
      .subscribe(response => {
        console.log('User registered successfully:', response);
        alert('User successfully registered!');
        this.registrationForm.reset();
      });
  }
}
