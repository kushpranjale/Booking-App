import { ManageDepartmentComponent } from './admin-dashboard/manage-department/manage-department.component';
import { AddDepartmentComponent } from './admin-dashboard/add-department/add-department.component';
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
    component: AdminDashboardComponent,
    children: [
      {
        path : 'add-department',
        component : AddDepartmentComponent
      },
      {
       path: 'manage-department',
       component: ManageDepartmentComponent
      }
    ]
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
