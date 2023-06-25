import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { RegisterUserComponent } from './register-user/register-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { RetrieveUsersComponent } from './retrieve-users/retrieve-users.component';
import { DeleteUsersComponent } from './delete-users/delete-users.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


const routes: Routes = [
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'retrieve', component: RetrieveUsersComponent },
  { path: 'delete', component: DeleteUsersComponent },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'users', component: UserListComponent },
  {path: 'login', component: LoginComponent},
  { path: 'home/:id', component: HomeComponent },
  { path: '', component: LandingPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
