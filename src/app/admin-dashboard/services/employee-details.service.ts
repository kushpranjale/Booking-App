import { Department } from './../models/department-model';
import { EmployeeDetail } from './../models/employee-details-model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class EmployeeDetailsService {
    employeeDetail: EmployeeDetail[] = [];
    url = 'http://localhost:4300/api/';
    updatedEmployeeDetails = new Subject<EmployeeDetail[]>();
    // tslint:disable-next-line: variable-name
    epm_status: number;

    constructor(private http: HttpClient, private datePipe: DatePipe) {}

    employeeListener() {
        return this.updatedEmployeeDetails.asObservable();
    }
    // Add employee details
    async addEmployee(formData: FormGroup) {
        const empData = {
            emp_username: formData.value.emp_username,
            emp_password: formData.value.emp_password,
            first_name: formData.value.first_name,
            last_name: formData.value.last_name,
            gender: formData.value.gender,
            address: formData.value.address,
            mobile: formData.value.mobile,
            email: formData.value.email,
            date_of_birth: formData.value.date_of_birth,
            date_of_joining: formData.value.date_of_joining,
            date_of_resign: formData.value.date_of_resign,
            kyc_type: formData.value.kyc_type,
            kyc_number: formData.value.kyc_number,
            kyc_proof: formData.value.kyc_proof,
        };
        console.log(empData);
        this.http
            .post<{ status: number; message: string; employee: string }>(
                `${this.url}new_employee`,
                empData
            )
            .subscribe(result => {
                console.log(result);
                this.epm_status = result.status;
                this.employeeDetail.push(empData);
                this.updatedEmployeeDetails.next([...this.employeeDetail]);
            });
    }

    getAllEmployee() {
        this.http
            .get(`${this.url}get_employees`)
            .subscribe((result: EmployeeDetail[]) => {
                this.employeeDetail = result;
                this.updatedEmployeeDetails.next([...this.employeeDetail]);
            });
    }
}
