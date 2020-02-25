import { ManageRoomService } from './../../../admin-dashboard/services/manage-room.service';
import { RoomTypeService } from './../../../admin-dashboard/services/room-type.service';
import {
    RoomType,
    RoomsData,
} from './../../../admin-dashboard/models/room-model';
import { GuestService } from './../../services/guest.service';
import { Component, OnInit, Output, Input } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
} from '@angular/forms';

@Component({
    selector: 'app-add-guest',
    templateUrl: './add-guest.component.html',
    styleUrls: ['./add-guest.component.css'],
})
export class AddGuestComponent implements OnInit {
    // tslint:disable-next-line: variable-name
    room_id: number;
    options: RoomType[] = [];
    RoomOptions: RoomsData[] = [];
    guestFormGroup: FormGroup;
    remaining: number;
    username: string;

    constructor(
        private bookingService: BookingService,
        private guestBooking: GuestService,
        private roomTypeService: RoomTypeService,
        private roomDetailService: ManageRoomService
    ) {}

    ngOnInit() {
        this.GetAllRoomType();
        this.GetAllRoomNumber();
        this.roomTypeService.roomTypeListener().subscribe(() => {
            this.GetAllRoomType();
        });
        this.roomDetailService.roomListener().subscribe(result => {
            this.GetAllRoomNumber();
        });
        this.guestFormGroup = new FormGroup({
            guest_username: new FormControl('', [Validators.required]),
            guest_age: new FormControl('', [Validators.required]),
            room_type_id: new FormControl('', [Validators.required]),
            room_no: new FormControl('', [Validators.required]),
            room_adult_count: new FormControl('', [Validators.required]),
            room_child_count: new FormControl('', [Validators.required]),
            kyc_type: new FormControl('', [Validators.required]),
            kyc_number: new FormControl('', [Validators.required]),
            kyc_proof: new FormControl('', [Validators.required]),
        });
        this.username = this.bookingService.customerUserName;

        this.bookingService.remaining = this.bookingService.adultCount;
        console.log(this.bookingService.remaining);
        this.remaining = this.bookingService.remaining;
    }
    GetAllRoomNumber() {
        this.roomDetailService.getAllRooms().subscribe(result => {
            this.RoomOptions = result;
        });
    }
    GetAllRoomType() {
        this.roomTypeService.getAllRooms().subscribe(result => {
            this.options = result;
        });
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        console.log(filterValue);
        const filter = this.options.filter(p => {
            if (p.room_type_name.includes(filterValue)) {
                return p.room_type_name.includes(filterValue);
            } else {
                return null;
            }
        });
        this.options = filter;
    }
    roomNumberFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        console.log(filterValue);
        const filter = this.RoomOptions.filter(p => {
            if (p.room_no.includes(filterValue)) {
                return p.room_no.includes(filterValue);
            } else {
                return null;
            }
        });
        this.RoomOptions = filter;
    }
    onchange(roomId: number) {
        this.room_id = roomId;
        console.log(this.room_id);
    }
    onSubmit(formDirective: FormGroupDirective) {
        if (this.guestFormGroup.invalid) {
            return;
        } else {
            this.bookingService.remaining =
                this.bookingService.remaining -
                (+this.guestFormGroup.value.room_adult_count +
                    +this.guestFormGroup.value.room_child_count);
            this.remaining = this.bookingService.remaining;
            this.guestBooking.addGuest(
                this.guestFormGroup,
                this.bookingService.customerUserName,
                this.room_id
            );
            formDirective.resetForm();
            this.guestFormGroup.reset();
        }
    }
}
