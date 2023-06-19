import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userId: number = 0; // Declare and initialize the userId variable

  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userId = 0; // Initialize with a default value
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id ? +id : 0;
    this.initUserForm();
    this.loadUserData();
  }

  initUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loadUserData() {
    this.userService.getUserById(this.userId).subscribe(
      (user: any) => {
        this.userForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password
        });
      },
      (error: any) => {
        console.error('Error loading user:', error);
      }
    );
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const updatedUser = {
      id: this.userId,
      ...this.userForm.value
    };

    this.userService.updateUser(this.userId, updatedUser).subscribe(
      () => {
        console.log('User updated successfully');
        // Perform any necessary actions after updating the user
      },
      (error: any) => {
        console.error('Error updating user:', error);
      }
    );
  }
}
