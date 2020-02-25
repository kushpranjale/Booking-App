import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../services/reviews.service';
import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Department } from 'src/app/admin-dashboard/models/department-model';
import { DepartmentService } from 'src/app/admin-dashboard/services/department.service';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css'],
})
export class ReviewComponents implements OnInit {
    reviewGroup: FormGroup;
    dep_id: number;
    departments: Department[] = [];
    review_name = false;
    message: string;
    constructor(
        private reviewService: ReviewsService,
        private snackBar: MatSnackBar,
        private departmentService: DepartmentService
    ) {}

    ngOnInit() {
        this.reviewGroup = new FormGroup({
            cust_username: new FormControl('', [Validators.required]),
            guest_username: new FormControl('', [Validators.required]),
            review: new FormControl(''),
            department_id: new FormControl('', [Validators.required]),
            rating: new FormControl(''),
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
        this.review_name = false;
    }
    ngOnChanges() {
        this.review_name = false;
    }

    onSubmit(formDirective: FormGroupDirective) {
        console.log(this.reviewGroup.get('guest_username'));
        if (this.reviewGroup.invalid) {
            return;
        } else {
            this.reviewService.addReviews(this.dep_id, this.reviewGroup);
            this.snackBar.open('Successfully Added', 'Close', {
                duration: 2000,
            });
            formDirective.resetForm();
            this.reviewGroup.reset();
        }
    }
}
