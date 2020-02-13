import { FormGroup } from '@angular/forms';
import { EmployeeJobDetail } from './../models/employee-details-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EmployeeJobDetailsService {
    url = 'http://localhost:4300/api/';
    updatedJobDetails = new Subject<EmployeeJobDetail[]>();
    employeeJobDetails: EmployeeJobDetail[] = [];

    constructor(private http: HttpClient) {}

    employeeJobListener() {
        return this.updatedJobDetails.asObservable();
    }

    async addJobDetail(userName: string, formData: FormGroup) {
        const jobData = {
            emp_username: userName,
            title: formData.value.title,
            from_date: formData.value.from_date,
            to_date: formData.value.to_date,
        };
        console.log('job data');
        console.log(jobData);
        this.http
            .post<{ message: string; id: number }>(
                `${this.url}new_job_title`,
                jobData
            )
            .subscribe(result => {
                console.log('employee bank details ' + result.message);
                // this.epm_status = result.status;
                this.employeeJobDetails.push(jobData);
                this.updatedJobDetails.next([...this.employeeJobDetails]);
            });
    }

    getAllJob() {
        this.http
            .get(`${this.url}get_job_titles`)
            .subscribe((result: EmployeeJobDetail[]) => {
                this.employeeJobDetails = result;
                this.updatedJobDetails.next([...this.employeeJobDetails]);
            });
    }
}
