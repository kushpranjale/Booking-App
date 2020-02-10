import { FormGroup } from '@angular/forms';
import { EmployeeSalariesDetail } from './../models/employee-details-model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class EmployeeSalaryDetailsService {
    url = 'http://localhost:4300/api/';
    updatedSalaryDetails = new Subject<EmployeeSalariesDetail[]>();
    employeeSalaryDetails: EmployeeSalariesDetail[] = [];

    constructor(private http: HttpClient) {}

    employeeSalaryListener() {
        return this.updatedSalaryDetails.asObservable();
    }

    addSalaryDetail(userName: string, formData: FormGroup) {
        const salaryData = {
            emp_username: userName,
            salary: formData.value.salary,
            from_date: formData.value.from_date,
            to_date: formData.value.to_date,
        };
        console.log('salary data');
        console.log(salaryData);
        this.http
            .post<{ message: string; id: number }>(
                `${this.url}add_salary`,
                salaryData
            )
            .subscribe(result => {
                console.log('employee bank details ' + result.message);
                // this.epm_status = result.status;
                this.employeeSalaryDetails.push(salaryData);
                this.updatedSalaryDetails.next([...this.employeeSalaryDetails]);
            });
    }

    getAllSalary() {
        this.http
            .get(`${this.url}get_salary`)
            .subscribe((result: EmployeeSalariesDetail[]) => {
                this.employeeSalaryDetails = result;
                this.updatedSalaryDetails.next([...this.employeeSalaryDetails]);
            });
    }
}
