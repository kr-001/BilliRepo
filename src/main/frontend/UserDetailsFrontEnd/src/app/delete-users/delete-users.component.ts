import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.css']
})
export class DeleteUsersComponent {
  users: any[] = []; // Array to hold retrieved users

  constructor(private http: HttpClient) {}

  retrieveUsers() {
    this.http.get('/api/users').subscribe(response => {
      this.users = response as any[];
    });
  }

  deleteUser(userId: number) {
    this.http.delete(`/api/users/${userId}`).subscribe(response => {
      // Handle the response or perform any necessary actions
    });
  }
}
