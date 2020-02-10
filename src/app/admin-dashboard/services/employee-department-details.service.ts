import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { EmployeeDepartmentDetail } from '../models/employee-details-model';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class EmployeeDepartmentDetailsService {
    url = 'http://localhost:4300/api/';
    updatedDepartmentDetails = new Subject<EmployeeDepartmentDetail[]>();
    employeeDepartmentDetails: EmployeeDepartmentDetail[] = [];
    constructor(private http: HttpClient) {}

    employeeDepartmentListener() {
        return this.updatedDepartmentDetails.asObservable();
    }

    addDepDetail(userName: string, dep_id: number, formData: FormGroup) {
        const bankData = {
            emp_username: userName,
            department_id: dep_id,
            from_date: formData.value.from_date,
            to_date: formData.value.to_date,
        };
        console.log('bank data');
        console.log(bankData);
        this.http
            .post<{ message: string; id: number }>(
                `${this.url}new_dept_emp`,
                bankData
            )
            .subscribe(result => {
                console.log('employee bank details ' + result.message);
                // this.epm_status = result.status;
                this.employeeDepartmentDetails.push(bankData);
                this.updatedDepartmentDetails.next([
                    ...this.employeeDepartmentDetails,
                ]);
            });
    }

    getAllDep() {
        this.http
            .get(`${this.url}get_dept_emp`)
            .subscribe((result: EmployeeDepartmentDetail[]) => {
                this.employeeDepartmentDetails = result;
                this.updatedDepartmentDetails.next([
                    ...this.employeeDepartmentDetails,
                ]);
            });
    }
}
