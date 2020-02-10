import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-add-room',
    templateUrl: './add-room.component.html',
    styleUrls: ['./add-room.component.css'],
})
export class AddRoomComponent implements OnInit {
    roomFormGroup: FormGroup;
    constructor() {}

    ngOnInit() {
        this.roomFormGroup = new FormGroup({
            room_no: new FormControl('', [Validators.required]),
            room_type_id: new FormControl('', [Validators.required]),
            no_of_people: new FormControl('', [Validators.required]),
            room_status: new FormControl('', [Validators.required]),
        });
    }

    onSubmit(formDirective: FormGroupDirective) {}
}
