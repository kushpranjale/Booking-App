import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.css']
})
export class LoginDashboardComponent implements OnInit {

  constructor(private routs: Router) { }

  ngOnInit() {
  }

  onClick(status: string) {
     if ( status === 'super') {
     this.routs.navigate(['superadmin']);
     } else if ( status === 'admin' ) {
       this.routs.navigate(['admin']);
     } else if ( status === 'user' ) {
      this.routs.navigate(['user']);
    }
  }

}
