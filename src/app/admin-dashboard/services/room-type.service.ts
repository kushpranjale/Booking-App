import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RoomType } from '../models/room-model';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class RoomTypeService {
    url = 'http://localhost:4300/api/';
    updatedRoomType = new Subject<RoomType[]>();
    roomTypeDetails: RoomType[] = [];
    constructor(private http: HttpClient) {}
    roomTypeListener() {
        return this.updatedRoomType.asObservable();
    }
    addRoomTypeDetail(formData: FormGroup) {
        const roomTypeData = {
            room_type_name: formData.value.room_type_name,
            room_type_rate: formData.value.room_type_rate,
        };
        console.log('salary data');
        console.log(roomTypeData);
        this.http
            .post<{ message: string; id: number }>(
                `${this.url}add_salary`,
                roomTypeData
            )
            .subscribe(result => {
                const Data = {
                    room_type_id: result.id,
                    room_type_name: formData.value.room_type_name,
                    room_type_rate: formData.value.room_type_rate,
                };
                console.log('Room type ' + result.message);
                // this.epm_status = result.status;
                this.roomTypeDetails.push(Data);
                this.updatedRoomType.next([...this.roomTypeDetails]);
            });
    }
    getAllRooms() {
        this.http
            .get(`${this.url}get_salary`)
            .subscribe((result: RoomType[]) => {
                this.roomTypeDetails = result;
                this.updatedRoomType.next([...this.roomTypeDetails]);
            });
    }
}
