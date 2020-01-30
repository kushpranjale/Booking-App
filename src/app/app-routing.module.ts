import { SuperDashboardComponent } from './super-dashboard/super-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserLoginComponent } from './login-dashboard/user-login/user-login.component';
import { AdminLoginComponent } from './login-dashboard/admin-login/admin-login.component';
import { SuperLoginComponent } from './login-dashboard/super-login/super-login.component';
import { LoginDashboardComponent } from './login-dashboard/login-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: LoginDashboardComponent,
    children: [
      {
        path: 'superadmin',
        component: SuperLoginComponent
      },
      {
        path: 'admin',
        component: AdminLoginComponent
      },
      {
        path: 'user',
        component: UserLoginComponent
      }
    ]
  },
  {
    path: 'superdashboard',
    component: SuperDashboardComponent
  },
  {
    path: 'admindashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'userdashboard',
    component: UserDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
