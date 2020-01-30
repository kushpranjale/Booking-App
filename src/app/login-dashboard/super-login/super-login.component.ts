import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-super-login',
  templateUrl: './super-login.component.html',
  styleUrls: ['./super-login.component.css']
})
export class SuperLoginComponent implements OnInit {

  superFormGroup: FormGroup;
  constructor() { }

  ngOnInit() {
    // validating and defining form controls
    this.superFormGroup = new FormGroup({
       userName : new FormControl('', [Validators.required]),
       userPassword: new FormControl('', [Validators.required])
    });
  }

  // submiting form detais for login
   onSubmit(form: FormGroupDirective) {
      console.log( this.superFormGroup);
  }


}
