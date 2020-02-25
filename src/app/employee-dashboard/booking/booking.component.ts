import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
} from '@angular/forms';
import { BookingService } from '../services/booking.service';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
    bookingFormGroup: FormGroup;
    adultCount: number;
    childCount: number;

    constructor(
        private routes: Router,
        private bookingService: BookingService
    ) {}

    ngOnInit() {
        this.bookingFormGroup = new FormGroup({
            cust_username: new FormControl('', [Validators.required]),
            adult_count: new FormControl('', [Validators.required]),
            child_count: new FormControl('', [Validators.required]),
            booking_time: new FormControl('', [Validators.required]),
            booking_status: new FormControl('', [Validators.required]),
        });
    }
    onSubmit(formDirective: FormGroupDirective) {
        if (this.bookingFormGroup.invalid) {
            return;
        } else {
            this.adultCount = +this.bookingFormGroup.value.adult_count;
            this.childCount = +this.bookingFormGroup.value.child_count;
            this.bookingService.adultCount = this.adultCount + this.childCount;
            this.bookingService.customerUserName = this.bookingFormGroup.value.cust_username;
            this.bookingService.addBooking(this.bookingFormGroup);
            console.log(this.bookingFormGroup);
            this.routes.navigate(['employee', 'add-guest']);
        }
    }
}
