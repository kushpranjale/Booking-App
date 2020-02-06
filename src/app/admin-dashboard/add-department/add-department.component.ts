import { DepartmentService } from '../services/department.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AddDepartmentComponent implements OnInit, OnChanges {

  departmentGroup: FormGroup;
  // tslint:disable-next-line: variable-name
  dep_name = false;
  message: string;
  status: number;

  constructor( private departmentService: DepartmentService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.departmentGroup = new FormGroup (
      {
        department_name: new FormControl('', [Validators.required]),
        location: new FormControl('', [Validators.required, Validators.minLength(3)]),
        services: new FormControl('', [Validators.required, Validators.minLength(3)]),
      }

    );
  }
  onChangeValue(){
    this.dep_name = false;
  }
 ngOnChanges() {
     this.dep_name = false;
  }

  onSubmit(formDirective: FormGroupDirective) {
    if ( this.departmentGroup.invalid) {
      return;
    } else {
      this.departmentService.validateDeaprtmentName(this.departmentGroup.value.department_name).subscribe(
        result => {
          this.message = `${this.departmentGroup.value.department_name} ${result.message} try other departments`;
          this.status = result.status;
          console.log(`${this.message} and ${this.status} `);
        }
      );
      if (this.status) {
           this.departmentService.addDepartment(this.departmentGroup);
           this.snackBar.open('Successfully Added', 'close', {
          duration: 2000
      });
           formDirective.resetForm();
           this.departmentGroup.reset();
      } else {
        this.dep_name = true;
        return;
      }

    }
  }

}
