import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Rooms, RoomsData } from '../models/room-model';
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

                this.roomDetails.push({
                    room_no: roomData.room_no,
                    room_type_id: id,
                    room_type_name: roomName,
                    no_of_people: roomData.no_of_people,
                    room_status: roomData.room_status,
                });
                this.updatedRoom.next([...this.roomDetails]);
            });
    }
    getAllRooms() {
        this.http
            .get(`${this.url}get_roomByName`)
            .subscribe((result: RoomsData[]) => {
                this.roomDetails = result;
                this.updatedRoom.next([...this.roomDetails]);
            });
    }
    removeRoom(roomNumber: string) {
        this.http
            .delete(`${this.url}remove_room/${roomNumber}`)
            .subscribe(result => {
                console.log(result);
                const RoomData = this.roomDetails.filter(
                    d => d.room_no !== roomNumber
                );
                this.updatedRoom.next([...RoomData]);
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
        };
        this.http
            .put(`${this.url}update_room/${roomNo}`, roomData)
            .subscribe(result => {
                const data = {
                    room_type_id: roomTypeId,
                    room_no: roomNo,
                    room_type_name: roomTypeName,
                    no_of_people: formData.value.no_of_people,
                    room_status: formData.value.room_status,
                };
                const updatedData = [...this.roomDetails];
                const oldIndex = updatedData.findIndex(
                    dep => dep.room_no === roomNo
                );
                updatedData[oldIndex] = data;
                this.roomDetails = updatedData;
                this.updatedRoom.next([...this.roomDetails]);
            });
    }
}
