import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly SESSION_STORAGE_KEY = 'myAppSession';
  constructor(private router: Router , private http : HttpClient) {}



  isAuthenticated(): boolean {
    const sessionData = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    return !!sessionData; 
  }


  logout() {
    
    sessionStorage.removeItem(this.SESSION_STORAGE_KEY);
    this.router.navigate(['/login']);
  }


  login(email: string, password: string) {
    const credentials = {
      email: email,
      password: password
    };
  
    this.http.post('http://localhost:8080/api/login', credentials).subscribe(
      (response: any) => {
        // Assuming the response contains an authentication token
        const authToken = response.token;
        const userId = response['id'];
        // Store the authentication token in session storage
        sessionStorage.setItem(this.SESSION_STORAGE_KEY, authToken);
        this.router.navigate(['/home' , userId]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  
}
