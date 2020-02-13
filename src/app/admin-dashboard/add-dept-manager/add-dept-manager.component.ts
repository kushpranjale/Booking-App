import { DeptManagerService } from './../services/dept-manager.service';
import { EmployeeDetailsService } from './../services/employee-details.service';
import { EmployeeDetail } from './../models/employee-details-model';
import {
    FormGroupDirective,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Department } from '../models/department-model';
import { DepartmentService } from '../services/department.service';
import { retry } from 'rxjs/operators';

@Component({
    selector: 'app-add-dept-manager',
    templateUrl: './add-dept-manager.component.html',
    styleUrls: ['./add-dept-manager.component.css'],
})
export class AddDeptManagerComponent implements OnInit {
    managerGroup: FormGroup;
    // tslint:disable-next-line: variable-name
    dep_id: number;
    options: Department[] = [];
    userOption: EmployeeDetail[];
    departments: Department[] = [];
    employees: EmployeeDetail[] = [];
    constructor(
        private departmentService: DepartmentService,
        private employeeService: EmployeeDetailsService,
        private managerService: DeptManagerService
    ) {}

    ngOnInit() {
        this.departmentService.getAllDepartments();
        this.departmentService.departmentListner().subscribe(result => {
            // tslint:disable-next-line: prefer-for-of
            this.departments = result;
            this.options = result;
        });

        this.employeeService.getAllEmployee();
        this.employeeService.employeeListener().subscribe(result => {
            this.employees = result;
            this.userOption = result;
        });

        this.managerGroup = new FormGroup({
            emp_username: new FormControl('', [Validators.required]),
            department_id: new FormControl('', [Validators.required]),
            from_date: new FormControl('', [Validators.required]),
            to_date: new FormControl('', [Validators.required]),
        });
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        console.log(filterValue);
        const filter = this.departments.filter(p => {
            if (p.department_name.includes(filterValue)) {
                return p.department_name.includes(filterValue);
            } else {
                return null;
            }
        });
        this.options = filter;
    }
    applyFilterUser(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        const filter = this.employees.filter(p => {
            if (p.emp_username.includes(filterValue)) {
                return p.emp_username.includes(filterValue);
            } else {
                return null;
            }
        });
        this.userOption = filter;
    }
    onchange(id: number) {
        this.dep_id = id;
        console.log(this.dep_id);
    }
    onSubmit(formDirective: FormGroupDirective) {
        if (this.managerGroup.invalid) {
            return;
        } else {
            this.managerService.addDeptManager(
                this.managerGroup.value.department_id,
                this.dep_id,
                this.managerGroup
            );
            formDirective.resetForm();
            this.managerGroup.reset();
        }
    }
}
