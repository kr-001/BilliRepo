import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  user: any = {}; // User object to hold the form data

  constructor(private http: HttpClient) {}

  registerUser() {
    this.http.post('/api/users', this.user).subscribe(response => {
      // Handle the response or perform any necessary actions
    });
  }
}
