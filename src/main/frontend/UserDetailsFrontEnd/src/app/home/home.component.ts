import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId!: number;
  user: any;

  constructor(private http: HttpClient , private route: ActivatedRoute , private authService : AuthService) { }

  ngOnInit() {
    this.getUserIdFromRoute();
    this.fetchUserDetails();
  }

  getUserIdFromRoute() {
      this.userId = this.route.snapshot.params['id'];
    };

    fetchUserDetails() {
      this.http.get<any>(`http://localhost:8080/api/users/${this.userId}`).subscribe(
        response => {
          this.user = response;
        },
        error => {
          console.error('Error fetching user details:', error);
        }
      );
    }

    
    logout(){
      this.authService.logout();
    }
}
