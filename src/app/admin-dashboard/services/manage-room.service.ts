import { RoomsData } from './../models/room-model';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class ManageRoomService {
    url = 'http://localhost:4300/api/';
    updatedRoom = new Subject<RoomsData[]>();
    roomDetails: RoomsData[] = [];
    constructor(private http: HttpClient) {}
    roomListener() {
        return this.updatedRoom.asObservable();
    }
    addRoomDetail(formData: FormGroup, id: number, roomName: string) {
        const roomData = {
            room_no: formData.value.room_no,
            room_type_id: id,
            no_of_people: formData.value.no_of_people,
            room_status: formData.value.room_status,
            floor: formData.value.floor,
            pool_facing: formData.value.pool_facing,
        };
        console.log('salary data');
        console.log(roomData);
        this.http
            .post<{ message: string; id: number }>(
                `${this.url}add_room`,
                roomData
            )
            .pipe(
                tap(() => {
                    this.updatedRoom.next();
                })
            )
            .subscribe(result => {
                console.log('Room type ' + result.message);
            });
    }
    getAllRooms(): Observable<RoomsData[]> {
        return this.http.get<RoomsData[]>(`${this.url}get_roomByName`);
    }
    removeRoom(roomNumber: string) {
        this.http
            .delete(`${this.url}remove_room/${roomNumber}`)
            .subscribe(result => {
                console.log(result);
                this.updatedRoom.next();
            });
    }
    getRoom(roomNo: string) {
        return this.http.get(`${this.url}get_room/${roomNo}`);
    }

    // updating department
    updateRoom(
        roomTypeName: string,
        roomTypeId: number,
        roomNo: string,
        formData: FormGroup
    ) {
        const roomData = {
            no_of_people: formData.value.no_of_people,
            room_status: formData.value.room_status,
            floor: formData.value.floor,
            pool_facing: formData.value.pool_facing,
        };
        this.http
            .put(`${this.url}update_room/${roomNo}`, roomData)
            .subscribe(result => {
                this.updatedRoom.next();
            });
    }
}
