import { CustomerService } from './../services/customer.service';
import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-add-customer',
    templateUrl: './add-customer.component.html',
    styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
    customerGroup: FormGroup;
    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerGroup = new FormGroup({
            cust_username: new FormControl('', [Validators.required]),
            cust_password: new FormControl('', [Validators.required]),
            first_name: new FormControl('', [Validators.required]),
            last_name: new FormControl('', [Validators.required]),
            mobile: new FormControl('', [Validators.required]),
            fax: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            phone: new FormControl('', [Validators.required]),
            age: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            gender: new FormControl('', [Validators.required]),
            kyc_type: new FormControl('', [Validators.required]),
            kyc_number: new FormControl('', [Validators.required]),
            kyc_proof: new FormControl('', [Validators.required]),
            cust_type: new FormControl('', [Validators.required]),
            nationality: new FormControl('', [Validators.required]),
        });
    }
    onEdit() {}
    onDelete() {}
    onSubmit(formDirective: FormGroupDirective) {
        if (this.customerGroup.invalid) {
            return;
        } else {
            this.customerService.addCustomer(this.customerGroup);
            this.customerGroup.reset();
            formDirective.resetForm();
        }
    }
}
