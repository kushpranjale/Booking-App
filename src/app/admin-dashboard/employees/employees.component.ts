import { DepartmentService } from './../services/department.service';
import { EmployeeSalaryDetailsService } from './../services/employee-salary-details.service';
import { EmployeeJobDetailsService } from './../services/employee-job-details.service';
import { EmployeeDepartmentDetailsService } from './../services/employee-department-details.service';
import { EmployeeBankDetailsService } from './../services/employee-bank-details.service';
import { CustomValidators } from '../custom_validators/emp_validator';
import { map, startWith } from 'rxjs/operators';
import { EmployeeDetail } from './../models/employee-details-model';
import { EmployeeDetailsService } from '../services/employee-details.service';
import { Component, OnInit, Inject, LOCALE_ID, OnDestroy } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subscription, Observable } from 'rxjs';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
    employeeDetail: EmployeeDetail[];
    //  myControl = new FormControl();
    options: string[] = [];
    departmentName: string[] = [];
    filteredOptions: Observable<string[]>;
    isLinear = false;
    employeeFormGroup: FormGroup;
    bankFormGroup: FormGroup;
    depFromGroup: FormGroup;
    jobFormGroup: FormGroup;
    salaryFormGroup: FormGroup;
    username: string;
    check = false;
    dep_id: number;
    // tslint:disable-next-line: variable-name
    constructor(
        private _formBuilder: FormBuilder,
        private employeeDetailService: EmployeeDetailsService,
        private employeeBankDetailService: EmployeeBankDetailsService,
        private employeeDepartmentService: EmployeeDepartmentDetailsService,
        private employeeJobDetailService: EmployeeJobDetailsService,
        private employeeSalaryDetailService: EmployeeSalaryDetailsService,
        private departmentService: DepartmentService,
        private datePipe: DatePipe,
        private customValidator: CustomValidators
    ) {}

    ngOnInit() {
        this.departmentService.getAllDepartments();
        this.departmentService.departmentListner().subscribe(result => {
            for (var i = 0; i < result.length; i++) {
                this.departmentName.push(result[i].department_name);
            }
        });

        this.options = this.departmentName;
        this.employeeDetailService.getAllEmployee();
        // employee detail form
        this.employeeFormGroup = this._formBuilder.group({
            emp_username: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(19),
                    this.ValidatorUser.bind(this),
                    this.customValidator.checkWhiteSpace,
                ],
            ],
            emp_password: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            gender: ['', Validators.required],
            address: ['', Validators.required],
            mobile: ['', Validators.required],
            email: ['', Validators.required],
            date_of_birth: ['', Validators.required],
            date_of_joining: ['', Validators.required],
            date_of_resign: ['', Validators.required],
            kyc_type: ['', Validators.required],
            kyc_number: ['', Validators.required],
            kyc_proof: ['', Validators.required],
        });

        // employee bank form
        this.bankFormGroup = this._formBuilder.group({
            emp_username: ['', Validators.required],
            bank_name: ['', Validators.required],
            IFSC_code: ['', Validators.required],
            bank_branch: ['', Validators.required],
            acc_no: ['', Validators.required],
            PAN_Id: ['', Validators.required],
        });

        // employee department form
        this.depFromGroup = this._formBuilder.group({
            emp_username: ['', Validators.required],
            department_id: ['', Validators.required],
            from_date: ['', Validators.required],
            to_date: ['', Validators.required],
        });

        // job title form group
        this.jobFormGroup = this._formBuilder.group({
            emp_username: ['', Validators.required],
            title: ['', Validators.required],
            from_date: ['', Validators.required],
            to_date: ['', Validators.required],
        });

        // salaries form group
        this.salaryFormGroup = this._formBuilder.group({
            emp_username: ['', Validators.required],
            salary: ['', Validators.required],
            from_date: ['', Validators.required],
            to_date: ['', Validators.required],
        });

        // calling employee details

        this.employeeDetailService.employeeListener().subscribe(result => {
            this.employeeDetail = result;
            console.log(result);
        });

        console.log(this.options);
        this.filteredOptions = this.depFromGroup.controls[
            'department_id'
        ].valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option =>
            option.toLowerCase().includes(filterValue)
        );
    }
    onfocus() {
        this.options;
        console.log('yes clicked');
    }

    // for employee details
    checkCase() {
        this.check = true;
        console.log(this.employeeFormGroup);
        this.username = this.employeeFormGroup.value.emp_username;
        this.bankFormGroup.controls['emp_username'].disable();
        this.depFromGroup.controls['emp_username'].disable();
        this.jobFormGroup.controls['emp_username'].disable();
        this.salaryFormGroup.controls['emp_username'].disable();
        console.log(
            this.datePipe.transform(
                this.employeeFormGroup.value.date_of_birth,
                'MM-dd-yyyy'
            )
        );
        // this.employeeDetailService.addEmployee(this.employeeFormGroup);
    }

    // for bank details
    checkBankCase() {
        // this.check = true;
        console.log(this.employeeFormGroup);
        console.log(this.bankFormGroup);
    }

    checkDepCase() {
        this.departmentService
            .setDepartmentId(this.depFromGroup.value.department_id)
            .subscribe(result => {
                console.log('department by id' + result.depId);
                this.dep_id = result.depId;
            });
        // this.employeeDetailService.addEmployee(this.employeeFormGroup);
        // this.employeeBankDetailService.addBankDetail(
        //     this.username,
        //     this.bankFormGroup
        // );
        // this.employeeDepartmentService.addDepDetail(
        //     this.username,
        //     this.depFromGroup
        // );
    }
    onSubmit() {
        console.log('employee details');
        console.log(this.employeeFormGroup);
        console.log('bank details');
        console.log(this.bankFormGroup);
        console.log('department details');
        console.log(this.depFromGroup);
        console.log('job details');
        console.log(this.jobFormGroup);
        console.log('salary details');
        console.log(this.salaryFormGroup);

        this.employeeDetailService.addEmployee(this.employeeFormGroup);
        this.employeeBankDetailService.addBankDetail(
            this.username,
            this.bankFormGroup
        );
        this.employeeDepartmentService.addDepDetail(
            this.username,
            this.dep_id,
            this.depFromGroup
        );
        this.employeeJobDetailService.addJobDetail(
            this.username,
            this.jobFormGroup
        );
        this.employeeSalaryDetailService.addSalaryDetail(
            this.username,
            this.salaryFormGroup
        );
    }

    ValidatorUser(control: FormControl): any {
        // this.username = control.value;
        // this.customValidator.userNameValidator(control.value);
        console.log(this.customValidator.userNameValidator(control)[0]);
        return this.customValidator.userNameValidator(control)[0];
    }
    // WhiteSpaceValidator( control: FormControl) {
    //  return this.customValidator.checkWhiteSpace(control);
    // }
}
