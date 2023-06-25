import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  invalidCredentials: boolean = false; // Declare invalidCredentials property

  constructor(private http: HttpClient, private router: Router , private authService : AuthService) { }

  onSubmit() {
    if (this.email && this.password) {
      const loginData = {
        email: this.email,
        password: this.password
      };

      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      this.http.post<any>('http://localhost:8080/api/login', loginData, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          
          console.error('Error logging in:', error);
          return throwError(error);
        })
      )
      .subscribe(response => {
        this.authService.login(this.email, this.password);
      }, error => {
        console.error('Invalid credentials:', error);
        this.invalidCredentials = true;
      });
    
    }
  }
  
}
