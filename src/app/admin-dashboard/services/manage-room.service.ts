import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Rooms } from '../models/room-model';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class ManageRoomService {
    url = 'http://localhost:4300/api/';
    updatedRoom = new Subject<Rooms[]>();
    roomDetails: Rooms[] = [];
    constructor(private http: HttpClient) {}
    roomListener() {
        return this.updatedRoom.asObservable();
    }
    addRoomDetail(formData: FormGroup, id: number) {
        const roomData = {
            room_no: formData.value.room_no,
            room_type_id: id,
            no_of_people: formData.value.no_of_people,
            room_status: formData.value.room_status,
        };
        console.log('salary data');
        console.log(roomData);
        this.http
            .post<{ message: string; id: number }>(
                `${this.url}add_room`,
                roomData
            )
            .subscribe(result => {
                console.log('Room type ' + result.message);
                // this.epm_status = result.status;
                this.roomDetails.push(roomData);
                this.updatedRoom.next([...this.roomDetails]);
            });
    }
    getAllRooms() {
        this.http.get(`${this.url}get_room`).subscribe((result: Rooms[]) => {
            this.roomDetails = result;
            this.updatedRoom.next([...this.roomDetails]);
        });
    }
}
