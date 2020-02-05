import { EmployeeDetailsService } from '../services/employee-details.service';
import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-empolyees',
  templateUrl: './empolyees.component.html',
  styleUrls: ['./empolyees.component.css']
})
export class EmpolyeesComponent implements OnInit {

  isLinear = false;
  employeeFormGroup: FormGroup;
  bankFormGroup: FormGroup;
  depFromGroup: FormGroup;
  jobFormGroup: FormGroup;
  salaryFormGroup: FormGroup;
  check = false;


  constructor(private _formBuilder: FormBuilder ,
              private employeeDetailService: EmployeeDetailsService,
              private datePipe: DatePipe ) { }

  ngOnInit() {

    this.employeeDetailService.getAllEmployee();
    // employee detail form
    this.employeeFormGroup = this._formBuilder.group({
      emp_username: ['', Validators.required],
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
      PAN_Id: ['', Validators.required]
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
  }

   checkCase() {
     this.check = true;

     console.log( this.datePipe.transform(this.employeeFormGroup.value.date_of_birth, 'MM-dd-yyyy'));
     this.employeeDetailService.addEmployee(this.employeeFormGroup);
   }
    onSubmit() {
    console.log( this.employeeFormGroup);
    console.log(this.bankFormGroup)
    }
}
