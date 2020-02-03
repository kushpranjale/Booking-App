import { DepartmentService } from './../department.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AddDepartmentComponent implements OnInit {

  departmentGroup: FormGroup;

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
  onSubmit(formDirective: FormGroupDirective) {
    if ( this.departmentGroup.invalid) {
      return;
    } else {
      this.departmentService.addDepartment(this.departmentGroup);
      this.snackBar.open('Successfully Added', 'close', {
          duration: 2000
      });
      formDirective.resetForm();
      this.departmentGroup.reset();
    }
  }

}
