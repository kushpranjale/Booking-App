import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    // validating and defining form controls
    this.userFormGroup = new FormGroup({
       userName : new FormControl('', [Validators.required]),
       userPassword: new FormControl('', [Validators.required])
    });
  }

  // submiting form detais for login
   onSubmit(form: FormGroupDirective) {
    console.log(this.userFormGroup);
  }

}
