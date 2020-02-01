import { DepartmentService } from './../department.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AddDepartmentComponent implements OnInit {

  departmentGroup: FormGroup;

  constructor( private departmentService: DepartmentService) { }

  ngOnInit() {
    this.departmentGroup = new FormGroup (
      {
        department_name: new FormControl('', [Validators.required]),
        location: new FormControl('', [Validators.required]),
        services: new FormControl('', [Validators.required]),
      }
    );
  }
  onSubmit(formDirective: FormGroupDirective) {
    this.departmentService.addDepartment(this.departmentGroup);
    console.log(this.departmentGroup);
  }

}
