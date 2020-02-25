import { Component, OnInit, OnChanges } from '@angular/core';
import { ComplaintsService } from '../services/complaints.service';
import { DepartmentService } from '../../admin-dashboard/services/department.service';
import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Complaints } from '../models/complaint-model';
import { Department } from 'src/app/admin-dashboard/models/department-model';

@Component({
    selector: 'app-complaint',
    templateUrl: './complaint.component.html',
    styleUrls: ['./complaint.component.css'],
})
export class ComplaintComponent implements OnInit {
    complaintGroup: FormGroup;
    dep_id: number;
    departments: Department[] = [];
    complaints: Complaints[] = [];
    comp_name = false;
    message: string;
    status: number;
    constructor(
        private complaintService: ComplaintsService,
        private snackBar: MatSnackBar,
        private departmentService: DepartmentService
    ) {}

    ngOnInit() {
        this.complaintGroup = new FormGroup({
            department_id: new FormControl('', [Validators.required]),
            room_no: new FormControl('', [Validators.required]),
            complaint_status: new FormControl('', [Validators.required]),
            customer_review: new FormControl(''),
        });

        this.departmentService.getAllDepartments();
        this.departmentService.departmentListner().subscribe(result => {
            this.departments = result;
        });
    }

    // Filter applying for department name
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        console.log(filterValue);
        const filter = this.departments.filter(p => {
            if (p.department_name.includes(filterValue)) {
                this.dep_id = p.department_id;
                return p.department_name.includes(filterValue);
            } else {
                return null;
            }
        });
        this.departments = filter;
    }

    onchange(id: number) {
        this.dep_id = id;
        console.log(this.dep_id);
    }

    onChangeValue() {
        this.comp_name = false;
    }
    ngOnChanges() {
        this.comp_name = false;
    }

    onSubmit(formDirective: FormGroupDirective) {
        console.log(this.complaintGroup.get('room_no'));
        if (this.complaintGroup.invalid) {
            return;
        } else {
            this.complaintService.addComplaint(
                this.dep_id,
                this.complaintGroup
            );
            this.snackBar.open('Successfully Added', 'close', {
                duration: 2000,
            });
            formDirective.resetForm();
            this.complaintGroup.reset();
        }
    }
}
