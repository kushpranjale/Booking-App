import { Injectable } from '@angular/core';
import { CustomerDetail } from '../employee-models/customer-model';
import { Subject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    deptManager: CustomerDetail[] = [];
    url = 'http://localhost:4300/api/';
    updatedCustomer = new Subject<CustomerDetail[]>();
    constructor(private http: HttpClient) {}
    customerListener() {
        return this.updatedCustomer.asObservable();
    }
    addCustomer(formData: FormGroup) {
        const data = {
            cust_username: formData.value.cust_username,
            cust_password: formData.value.cust_password,
            first_name: formData.value.first_name,
            last_name: formData.value.last_name,
            mobile: formData.value.mobile,
            fax: formData.value.fax,
            email: formData.value.email,
            phone: formData.value.phone,
            age: formData.value.age,
            address: formData.value.address,
            gender: formData.value.gender,
            kyc_type: formData.value.kyc_type,
            kyc_number: formData.value.kyc_number,
            kyc_proof: formData.value.kyc_proof,
            cust_type: formData.value.cust_type,
            nationality: formData.value.nationality,
        };
        this.http
            .post(`${this.url}new_customer`, data)
            .pipe(
                tap(() => {
                    this.updatedCustomer.next();
                })
            )
            .subscribe();
    }
    getAllCustomer(): Observable<CustomerDetail[]> {
        return this.http.get<CustomerDetail[]>(`${this.url}get_customer`);
    }

    removeCustomer(username: string) {
        this.http
            .delete(`${this.url}remove_customer/${username}`)
            .subscribe(result => {
                this.updatedCustomer.next();
            });
    }
    getCustomer(userName: string) {
        return this.http.get(`${this.url}get_customer/${userName}`);
    }

    updateCustomer(username: string, formData: FormGroup) {
        const data = {
            first_name: formData.value.first_name,
            last_name: formData.value.last_name,
            mobile: formData.value.mobile,
            fax: formData.value.fax,
            email: formData.value.email,
            phone: formData.value.phone,
            age: formData.value.age,
            address: formData.value.address,
            gender: formData.value.gender,
            kyc_type: formData.value.kyc_type,
            kyc_number: formData.value.kyc_number,
            kyc_proof: formData.value.kyc_proof,
            cust_type: formData.value.cust_type,
            nationality: formData.value.nationality,
        };
        this.http
            .put(`${this.url}update_customer/${username}`, data)
            .pipe(
                tap(res => {
                    console.log(res);
                    this.updatedCustomer.next();
                })
            )
            .subscribe(result => {
                console.log(result);
            });
    }
}
