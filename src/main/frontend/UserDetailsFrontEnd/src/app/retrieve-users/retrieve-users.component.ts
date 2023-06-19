import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-retrieve-users',
  templateUrl: './retrieve-users.component.html',
  styleUrls: ['./retrieve-users.component.css']
})
export class RetrieveUsersComponent {
  users: any[] = []; // Array to hold retrieved users

  constructor(private http: HttpClient) {}

  retrieveUsers() {
    this.http.get('/api/users').subscribe(response => {
      this.users = response as any[];
    });
  }
}
