import { EmployeeDetail } from '../models/employee-details-model';
import { EmployeeDetailsService } from '../services/employee-details.service';
import { Injectable, OnInit } from '@angular/core';

import { FormControl, AbstractControl } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CustomValidators {

  employeeDetail: EmployeeDetail[] = [];
  status;
constructor( private employeeService: EmployeeDetailsService) {
   this.employeeService.employeeListener()
  .subscribe( result => {
     result.map((values: EmployeeDetail) => {
      // console.log('from validators');
      // console.log(values.emp_username);
       this.employeeDetail = result;
     });
  });
}



 userNameValidator(control: FormControl ): any {
const userName = control.value.toLowerCase()
;
return this.employeeDetail.filter( e =>  e.emp_username.toLowerCase() === userName ).map( emp => {
   if (!!!!emp.emp_username.length) {
     console.log(emp.emp_username.length.toString());
  //   control.setErrors({userError: true});
     return {userError: true};
   }
// console.log(!!!!emp.emp_username.length);

  });

}
 checkWhiteSpace( control: FormControl ): any {
   console.log(/\s/.test(control.value));
   if (/\s/.test(control.value)) {
      return {whitSpaceError: true}
   } else {
     return null;
   }
 }

}

