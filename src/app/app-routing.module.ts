import { ReviewComponents } from './user-dashboard/review/review.component';
import { ReviewComponent } from './employee-dashboard/review/review.component';
import { BookingComponent } from './employee-dashboard/booking/booking.component';
import { ComplaintsComponent } from './employee-dashboard/complaints/complaints.component';
import { MANAGECustomerComponent } from './employee-dashboard/manage-customer/manage-customer.component';
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
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageextraComponent } from './admin-dashboard/AddExtra/Manageextra/Manageextra.component';
import { AddDeptManagerComponent } from './admin-dashboard/add-dept-manager/add-dept-manager.component';
import { ManageDeptManagerComponent } from './admin-dashboard/manage-dept-manager/manage-dept-manager.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AddCustomerComponent } from './employee-dashboard/add-customer/add-customer.component';
import { ComplaintComponent } from './user-dashboard/complaint/complaint.component';

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
        path: 'employee',
        component: EmployeeDashboardComponent,
        children: [
            { path: 'add-customer', component: AddCustomerComponent },
            { path: 'manage-customer', component: MANAGECustomerComponent },
            { path: 'complaints', component: ComplaintsComponent },
            { path: 'booking', component: BookingComponent },
            { path: 'review', component: ReviewComponent },
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
        children: [
            {
                path: 'complaints',
                component: ComplaintComponent,
            },
            {
                path: 'review',
                component: ReviewComponents,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
