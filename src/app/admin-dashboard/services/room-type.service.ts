import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { RoomType } from '../models/room-model';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

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
            .pipe(
                tap(() => {
                    this.updatedRoomType.next();
                })
            )
            .subscribe();
    }
    getAllRooms(): Observable<RoomType[]> {
        return this.http.get<RoomType[]>(`${this.url}get_room_type`);
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
                this.updatedRoomType.next();
            });
    }
}
