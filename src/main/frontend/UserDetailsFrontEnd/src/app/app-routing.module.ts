import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { RegisterUserComponent } from './register-user/register-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { RetrieveUsersComponent } from './retrieve-users/retrieve-users.component';
import { DeleteUsersComponent } from './delete-users/delete-users.component';
import {RegistrationFormComponent} from "./registration-form/registration-form.component";
import { UserListComponent } from './user-list/user-list.component';
const routes: Routes = [
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'retrieve', component: RetrieveUsersComponent },
  { path: 'delete', component: DeleteUsersComponent },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'users', component: UserListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
