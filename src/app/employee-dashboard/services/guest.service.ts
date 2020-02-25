import { tap } from 'rxjs/operators';
import { Guest } from './../employee-models/booking-model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { url } from 'inspector';

@Injectable({
    providedIn: 'root',
})
export class GuestService {
    updatedGuest = new Subject<Guest[]>();
    url = 'http://localhost:4300/api/';

    constructor(private http: HttpClient) {}
    guestListener() {
        return this.updatedGuest.asObservable();
    }
    addGuest(formData: FormGroup, name: string, id: number) {
        const data = {
            cust_username: name,
            guest_username: formData.value.guest_username,
            guest_age: formData.value.guest_age,
            room_type_id: id,
            room_no: formData.value.room_no,
            room_adult_count: formData.value.room_adult_count,
            room_child_count: formData.value.room_child_count,
            kyc_type: formData.value.kyc_type,
            kyc_number: formData.value.kyc_number,
            kyc_proof: formData.value.kyc_proof,
        };
        this.http
            .post(`${this.url}new_guest`, data)
            .pipe(
                tap(() => {
                    this.updatedGuest.next();
                })
            )
            .subscribe();
    }

    getGuest() {
        return this.http.get(`${this.url}get_guests`);
    }
}
