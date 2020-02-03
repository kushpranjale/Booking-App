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
import {MatToolbarModule ,
        MatMenuModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatSidenavModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatStepperModule,
        MatSnackBarModule,
        MatIconModule} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddDepartmentComponent } from './admin-dashboard/add-department/add-department.component';
import { ManageDepartmentComponent, DialogOverview } from './admin-dashboard/manage-department/manage-department.component';
import { HttpClientModule } from '@angular/common/http';
import { EmpolyeesComponent } from './admin-dashboard/empolyees/empolyees.component';


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
    EmpolyeesComponent

  ],
  entryComponents: [
    DialogOverview
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule ,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatStepperModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
