import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginDashboardComponent } from './login-dashboard/login-dashboard.component';
import { SuperLoginComponent } from './login-dashboard/super-login/super-login.component';
import { AdminLoginComponent } from './login-dashboard/admin-login/admin-login.component';
import { UserLoginComponent } from './login-dashboard/user-login/user-login.component';
import { SuperDashboardComponent } from './super-dashboard/super-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

// importing angular material
import {
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule,
    MatStepperModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSnackBarModule,
    MatIconModule,
    MAT_DATE_LOCALE,
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddDepartmentComponent } from './admin-dashboard/add-department/add-department.component';
import {
    ManageDepartmentComponent,
    DialogOverview,
} from './admin-dashboard/manage-department/manage-department.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from './admin-dashboard/employees/employees.component';
import { DatePipe } from '@angular/common';
import { ManageEmployeeComponent } from './admin-dashboard/employees/manage-employee/manage-employee.component';
import { RoomTypeComponent } from './admin-dashboard/room/room-type/room-type.component';
import { AddRoomComponent } from './admin-dashboard/room/add-room/add-room.component';
import { ManageRoomComponent } from './admin-dashboard/room/manage-room/manage-room.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginDashboardComponent,
        SuperLoginComponent,
        AdminLoginComponent,
        UserLoginComponent,
        SuperDashboardComponent,
        AdminDashboardComponent,
        UserDashboardComponent,
        AddDepartmentComponent,
        ManageDepartmentComponent,
        DialogOverview,
        EmployeesComponent,
        ManageEmployeeComponent,
        RoomTypeComponent,
        AddRoomComponent,
        ManageRoomComponent,
    ],
    entryComponents: [DialogOverview],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatPaginatorModule,
        MatStepperModule,
        MatTableModule,
        MatSortModule,
        HttpClientModule,
        MatTabsModule,
        MatRadioModule,
        MatDialogModule,
        MatSnackBarModule,
        AppRoutingModule,
    ],
    providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
    bootstrap: [AppComponent],
})
export class AppModule {}
