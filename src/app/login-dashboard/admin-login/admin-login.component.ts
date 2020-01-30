import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    // validating and defining form controls
    this.adminFormGroup = new FormGroup({
       userName : new FormControl('', [Validators.required]),
       userPassword: new FormControl('', [Validators.required])
    });
  }

  // submiting form detais for login
   onSubmit(form: FormGroupDirective) {
    console.log(this.adminFormGroup);
  }

}
