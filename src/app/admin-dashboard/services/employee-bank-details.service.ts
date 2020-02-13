import { EmployeeBankDetail } from './../models/employee-details-model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class EmployeeBankDetailsService {
    url = 'http://localhost:4300/api/';
    updatedBankDetails = new Subject<EmployeeBankDetail[]>();
    employeeBankDetails: EmployeeBankDetail[] = [];

    constructor(private http: HttpClient) {}

    // listener
    employeeBankListener() {
        return this.updatedBankDetails.asObservable();
    }

    async addBankDetail(userName: string, formData: FormGroup) {
        const bankData = {
            emp_username: userName,
            bank_name: formData.value.bank_name,
            bank_branch: formData.value.bank_branch,
            acc_no: formData.value.acc_no,
            IFSC_code: formData.value.IFSC_code,
            PAN_Id: formData.value.PAN_Id,
        };
        console.log('bank data  bank data');
        console.log(bankData);
        this.http
            .post<{ message: string; id: number }>(
                `${this.url}new_bank_details`,
                bankData
            )
            .subscribe(result => {
                console.log('employee bank details ' + result.message);
                // this.epm_status = result.status;
                this.employeeBankDetails.push(bankData);
                this.updatedBankDetails.next([...this.employeeBankDetails]);
            });
    }

    getAllBank() {
        this.http
            .get(`${this.url}get_bank_detail`)
            .subscribe((result: EmployeeBankDetail[]) => {
                this.employeeBankDetails = result;
                this.updatedBankDetails.next([...this.employeeBankDetails]);
            });
    }
}
