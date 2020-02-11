import { ExtrasService } from './../services/extras.service';
import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-AddExtra',
    templateUrl: './AddExtra.component.html',
    styleUrls: ['./AddExtra.component.css'],
})
export class AddExtraComponent implements OnInit {
    ExtraFormGroup: FormGroup;
    constructor(private extraService: ExtrasService) {}

    ngOnInit() {
        this.ExtraFormGroup = new FormGroup({
            extra_type: new FormControl('', [Validators.required]),
            extra_sub_type: new FormControl('', [Validators.required]),
            extra_charge: new FormControl('', [Validators.required]),
        });
    }
    onSubmit(formDirective: FormGroupDirective) {
        if (this.ExtraFormGroup.invalid) {
            return;
        } else {
            this.extraService.addExtraDetail(this.ExtraFormGroup);
            this.ExtraFormGroup.reset();
            formDirective.resetForm();
        }
    }
}
