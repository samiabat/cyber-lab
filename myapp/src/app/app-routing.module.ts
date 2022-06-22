
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component: WelcomePageComponent},
  {path:'home', component: WelcomePageComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
