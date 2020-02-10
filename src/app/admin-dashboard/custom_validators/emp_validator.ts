import { DepartmentService } from './../services/department.service';
import { EmployeeDetail } from '../models/employee-details-model';
import { EmployeeDetailsService } from '../services/employee-details.service';
import { Injectable, OnInit } from '@angular/core';

import { FormControl, AbstractControl } from '@angular/forms';
@Injectable({
    providedIn: 'root',
})
export class CustomValidators {
    employeeDetail: EmployeeDetail[] = [];
    depStatus: number;
    status;
    constructor(
        private employeeService: EmployeeDetailsService,
        private departmentService: DepartmentService
    ) {
        this.employeeService.employeeListener().subscribe(result => {
            result.map((values: EmployeeDetail) => {
                // console.log('from validators');
                // console.log(values.emp_username);
                this.employeeDetail = result;
            });
        });
        // departmentService.validateDeaprtmentName()
    }

    userNameValidator(control: FormControl): any {
        const userName = control.value.toLowerCase();
        return this.employeeDetail
            .filter(e => e.emp_username.toLowerCase() === userName)
            .map(emp => {
                if (!!!!emp.emp_username.length) {
                    console.log(emp.emp_username.length.toString());
                    //   control.setErrors({userError: true});
                    return { userError: true };
                }
                // console.log(!!!!emp.emp_username.length);
            });
    }
    checkWhiteSpace(control: FormControl): any {
        console.log(/\s/.test(control.value));
        if (/\s/.test(control.value)) {
            return { whitSpaceError: true };
        } else {
            return null;
        }
    }

    checkDepartment(control: FormControl): any {
        console.log(/\s/.test(control.value));
        if (/\s/.test(control.value)) {
            return { whitSpaceError: true };
        } else {
            return null;
        }
    }
}
