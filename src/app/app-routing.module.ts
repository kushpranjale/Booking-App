import { AddExtraComponent } from './admin-dashboard/AddExtra/AddExtra.component';
import { ManageRoomComponent } from './admin-dashboard/room/manage-room/manage-room.component';
import { AddRoomComponent } from './admin-dashboard/room/add-room/add-room.component';
import { RoomTypeComponent } from './admin-dashboard/room/room-type/room-type.component';
import { ManageEmployeeComponent } from './admin-dashboard/employees/manage-employee/manage-employee.component';
import { EmployeesComponent } from './admin-dashboard/employees/employees.component';
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
import { ManageextraComponent } from './admin-dashboard/AddExtra/Manageextra/Manageextra.component';
import { AddDeptManagerComponent } from './admin-dashboard/add-dept-manager/add-dept-manager.component';
import { ManageDeptManagerComponent } from './admin-dashboard/manage-dept-manager/manage-dept-manager.component';

const routes: Routes = [
    {
        path: '',
        component: LoginDashboardComponent,
        children: [
            {
                path: 'superadmin',
                component: SuperLoginComponent,
            },
            {
                path: 'admin',
                component: AdminLoginComponent,
            },
            {
                path: 'user',
                component: UserLoginComponent,
            },
        ],
    },
    {
        path: 'superdashboard',
        component: SuperDashboardComponent,
    },
    {
        path: 'admindashboard',
        component: AdminDashboardComponent,
        children: [
            {
                path: 'add-department',
                component: AddDepartmentComponent,
            },
            {
                path: 'manage-department',
                component: ManageDepartmentComponent,
            },
            {
                path: 'add-employee',
                component: EmployeesComponent,
            },
            {
                path: 'man-employee',
                component: ManageEmployeeComponent,
            },
            {
                path: 'room-type',
                component: RoomTypeComponent,
            },
            {
                path: 'add-room',
                component: AddRoomComponent,
            },
            {
                path: 'man-room',
                component: ManageRoomComponent,
            },
            {
                path: 'add-extra',
                component: AddExtraComponent,
            },
            {
                path: 'man-extra',
                component: ManageextraComponent,
            },
            {
                path: 'add-dept-manager',
                component: AddDeptManagerComponent,
            },
            {
                path: 'manage-dept-manager',
                component: ManageDeptManagerComponent,
            },
        ],
    },
    {
        path: 'userdashboard',
        component: UserDashboardComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
