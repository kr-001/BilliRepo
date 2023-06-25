import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LocationService } from '../location.service';
import { Location } from '../location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;
  locations: Location[] = [];
  selectedLocation: Location | undefined;

  constructor(
    private router : Router,
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

    const selectedLocationId = this.registrationForm.value.location;
    this.selectedLocation = this.locations.find(location => location.id === +selectedLocationId);

    if (!this.selectedLocation) {
      console.error('Selected location not found');
      return;
    }

    const userData = {
      fullName: this.registrationForm.value.fullName,
      location: `${this.selectedLocation.city}, ${this.selectedLocation.state}`,
      email: this.registrationForm.value.email,
      mobile: this.registrationForm.value.mobile,
      password: this.registrationForm.value.password
    };

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.post('http://localhost:8080/api/users', JSON.stringify(userData), httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error registering user:', error);
          alert("Email is already registered, Try different one");
          location.reload();
          return throwError(error);
        })
      )
      .subscribe(response => {
        alert("User Succesfully Registered , Click Ok to redirect to Homepage");
        this.router.navigate(['/']);
        console.log('User registered successfully:', response);
      });
  }
}
