import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../services/reviews.service';
import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css'],
})
export class ReviewComponents implements OnInit {
    reviewGroup: FormGroup;
    review_name = false;
    message: string;
    constructor(
        private reviewService: ReviewsService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.reviewGroup = new FormGroup({
            cust_username: new FormControl('', [Validators.required]),
            guest_username: new FormControl('', [Validators.required]),
            review: new FormControl(''),
            department_id: new FormControl('', [Validators.required]),
            rating: new FormControl(''),
        });
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
            this.reviewService.addReviews(this.reviewGroup);
            this.snackBar.open('Successfully Added', 'Close', {
                duration: 2000,
            });
            formDirective.resetForm();
            this.reviewGroup.reset();
        }
    }
}
