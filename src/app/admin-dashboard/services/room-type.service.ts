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
        this.http
            .post<{ message: string; Id: number }>(
                `${this.url}add_room_type`,
                roomTypeData
            )
            .subscribe(result => {
                console.log('Room type ' + result.message);
                console.log(result.Id);
                // this.epm_status = result.status;
                this.roomTypeDetails.push({
                    room_type_id: result.Id,
                    room_type_name: roomTypeData.room_type_name,
                    room_type_rate: roomTypeData.room_type_rate,
                });
                this.updatedRoomType.next([...this.roomTypeDetails]);
                console.log(this.roomTypeDetails);
            });
    }
    getAllRooms() {
        this.http
            .get(`${this.url}get_room_type`)
            .subscribe((result: RoomType[]) => {
                this.roomTypeDetails = result;
                this.updatedRoomType.next([...this.roomTypeDetails]);
            });
    }

    removeRoom(name: string) {
        this.http
            .delete(`${this.url}remove_room_type/${name}`)
            .subscribe(result => {
                console.log(result);
                const RoomData = this.roomTypeDetails.filter(
                    d => d.room_type_name !== name
                );
                this.updatedRoomType.next([...RoomData]);
            });
    }
    getRoomType(name: string) {
        return this.http.get(`${this.url}get_room_type/${name}`);
    }
    updateRoom(Id: number, roomTypeName: string, roomTypeRate: number) {
        const roomData = {
            room_type_rate: roomTypeRate,
        };
        console.log(roomTypeName);
        this.http
            .put(`${this.url}update_room_type/${roomTypeName}`, roomData)
            .subscribe(result => {
                const data = {
                    room_type_id: Id,
                    room_type_name: roomTypeName,
                    room_type_rate: roomTypeRate,
                };
                console.log(data);
                const updatedData = [...this.roomTypeDetails];
                const oldIndex = updatedData.findIndex(
                    dep => dep.room_type_name === roomTypeName
                );
                updatedData[oldIndex] = data;
                this.roomTypeDetails = updatedData;
                this.updatedRoomType.next([...this.roomTypeDetails]);
            });
    }
}
