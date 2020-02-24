import { Component, OnInit, OnChanges } from '@angular/core';
import { ComplaintsService } from '../services/complaints.service';
import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-complaint',
    templateUrl: './complaint.component.html',
    styleUrls: ['./complaint.component.css'],
})
export class ComplaintComponent implements OnInit {
    complaintGroup: FormGroup;
    comp_name = false;
    message: string;
    status: number;
    constructor(
        private complaintService: ComplaintsService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.complaintGroup = new FormGroup({
            department_id: new FormControl('', [Validators.required]),
            room_no: new FormControl('', [Validators.required]),
            complaint_status: new FormControl('', [Validators.required]),
            customer_review: new FormControl(''),
        });
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
            this.complaintService.addComplaint(this.complaintGroup);
            this.snackBar.open('Successfully Added', 'close', {
                duration: 2000,
            });
            formDirective.resetForm();
            this.complaintGroup.reset();
        }
    }
}
