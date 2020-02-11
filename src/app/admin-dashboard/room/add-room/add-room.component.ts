import { ManageRoomService } from './../../services/manage-room.service';
import { RoomType } from './../../models/room-model';
import { MatTableDataSource } from '@angular/material';
import { RoomTypeService } from './../../services/room-type.service';
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
    RoomData: RoomType[] = [];
    options: RoomType[] = [];
    id: number;
    constructor(
        private roomTypeService: RoomTypeService,
        private roomDetailService: ManageRoomService
    ) {}

    ngOnInit() {
        this.roomTypeService.getAllRooms();
        this.roomTypeService.roomTypeListener().subscribe(result => {
            this.RoomData = result;
            this.options = this.RoomData;
        });

        this.roomFormGroup = new FormGroup({
            room_no: new FormControl('', [Validators.required]),
            room_type_id: new FormControl('', [Validators.required]),
            no_of_people: new FormControl('', [Validators.required]),
            room_status: new FormControl('', [Validators.required]),
        });
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        const filter = this.RoomData.filter(p => {
            if (p.room_type_name.includes(filterValue)) {
                return p.room_type_name.includes(filterValue);
            } else {
                return null;
            }
        });
        this.options = filter;
    }
    onchange(id: number) {
        this.id = id;
        console.log(name);
    }

    onSubmit(formDirective: FormGroupDirective) {
        if (this.roomFormGroup.invalid) {
            return;
        } else {
            this.roomDetailService.addRoomDetail(this.roomFormGroup, this.id);
        }
    }
}
