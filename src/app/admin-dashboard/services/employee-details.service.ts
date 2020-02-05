import { EmployeeDetail } from './../models/employee-details-model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {
  employessDetail: EmployeeDetail[] = [];
  url = 'http://localhost:4300/api/';
  updatedEployeeDetails = new Subject<EmployeeDetail>();
  // tslint:disable-next-line: variable-name
  epm_status: number;


  constructor( private http: HttpClient , private datePipe: DatePipe) { }

  employeeListner() {
    return this.updatedEployeeDetails.asObservable();
  }
  // Add emplyee detais
  addEmployee( formData: FormGroup) {
    const empData = {
      emp_username: formData.value.emp_username,
      emp_password : formData.value.emp_password,
      first_name: formData.value.first_name,
      last_name: formData.value.last_name,
      gender: formData.value.gender,
      address: formData.value.address,
      mobile: formData.value.mobile,
      email: formData.value.email,
      date_of_birth: this.datePipe.transform(formData.value.date_of_birth,"yyyy/MM/dd"),
      date_of_joining: this.datePipe.transform(formData.value.date_of_joining, "yyyy/MM/dd"),
      date_of_resign: this.datePipe.transform(formData.value.date_of_resign,"yyyy/MM/dd"),
      kyc_type: formData.value.kyc_type,
      kyc_number: formData.value.kyc_number,
      kyc_proof: formData.value.kyc_proof,
    };
    console.log(empData)
    this.http.post<{status: number, message: string, employee: string}>(`${this.url}new_employee`, empData)
    .subscribe ( (result) => {
       console.log(result.status);
       this.epm_status = result.status;
    }, );
  }

  getAllEmployee() {
   this.http.get(`${this.url}get_employees` )
   .subscribe(
     (result: EmployeeDetail[]) => {
       result.map((value: EmployeeDetail) => {
        console.log(value.emp_username)
        console.log(this.datePipe.transform(value.date_of_joining,"yyy/MM/dd"));
        console.log(value.date_of_joining)
       })

     }
   )
  }
}
