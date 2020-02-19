import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormGroupDirective,
    FormBuilder,
    FormControl,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
    bookingFormGroup: FormGroup;
    guestFormGroup: FormGroup;
    isLinear = false;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.bookingFormGroup = this.formBuilder.group({
            cust_username: new FormControl('', [Validators.required]),
            child_count: new FormControl('', [Validators.required]),
            book_time: new FormControl('', [Validators.required]),
            adult_count: new FormControl('', [Validators.required]),
            booking_status: new FormControl('', [Validators.required]),
        });
        this.guestFormGroup = this.formBuilder.group({
            cust_username: new FormControl('', [Validators.required]),
            guest_username: new FormControl('', [Validators.required]),
            first_name: new FormControl('', [Validators.required]),
            last_name: new FormControl('', [Validators.required]),
            mobile: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            age: new FormControl('', [Validators.required]),
            gender: new FormControl('', [Validators.required]),
            kyc_type: new FormControl('', [Validators.required]),
            kyc_number: new FormControl('', [Validators.required]),
            kyc_proof: new FormControl('', [Validators.required]),
            nationality: new FormControl('', [Validators.required]),
            room_no: new FormControl('', [Validators.required]),
        });
    }
    checkCase() {}
    onSubmit() {}
}
