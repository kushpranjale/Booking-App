import { CustomValidators } from './../custom_validators/emp_validator';
import { DepartmentService } from '../services/department.service';
import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
} from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-add-department',
    templateUrl: './add-department.component.html',
    styleUrls: ['./add-department.component.css'],
    // encapsulation: ViewEncapsulation.None
})
export class AddDepartmentComponent implements OnInit, OnChanges {
    departmentGroup: FormGroup;
    // tslint:disable-next-line: variable-name
    dep_name = false;
    message: string;
    status: number;

    constructor(
        private departmentService: DepartmentService,
        private snackBar: MatSnackBar,
        private customValidator: CustomValidators
    ) {}

    ngOnInit() {
        this.departmentGroup = new FormGroup({
            department_name: new FormControl('', [
                Validators.required,
                // this.ValidatorUser.bind(this),
            ]),
            location: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
            ]),
            services: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
            ]),
        });
    }
    onChangeValue() {
        this.dep_name = false;
    }
    ngOnChanges() {
        this.dep_name = false;
    }

    onSubmit(formDirective: FormGroupDirective) {
        console.log(this.departmentGroup.get('location'));
        if (this.departmentGroup.invalid) {
            return;
        } else {
            this.departmentService.addDepartment(this.departmentGroup);
            this.snackBar.open('Successfully Added', 'close', {
                duration: 2000,
            });
            formDirective.resetForm();
            this.departmentGroup.reset();
        }
    }
    // ValidatorUser(control: FormControl): any {
    //     // this.username = control.value;
    //     // this.customValidator.userNameValidator(control.value);
    //     this.departmentService
    //         .validateDeaprtmentName(control.value)
    //         .subscribe(result => {
    //             this.message = `${this.departmentGroup.value.department_name} ${result.message} try other departments`;
    //             this.status = result.status;
    //             console.log(`${this.message} and ${this.status} `);
    //         });
    //     if (this.status) {
    //         return { departmentExist: true };
    //     } else if (this.status) {
    //         return null;
    //     }
    // }
}
