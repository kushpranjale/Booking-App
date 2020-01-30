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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginDashboardComponent,
    SuperLoginComponent,
    AdminLoginComponent,
    UserLoginComponent,
    SuperDashboardComponent,
    AdminDashboardComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
