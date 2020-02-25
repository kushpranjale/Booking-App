import { tap } from 'rxjs/operators';
import { Booking } from './../employee-models/booking-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class BookingService {
    adultCount: number;
    customerUserName: string;
    url = 'http://localhost:4300/api/';
    remaining = 0;
    updatedBooking = new Subject<Booking[]>();

    constructor(private http: HttpClient) {}
    BookingListener() {
        return this.updatedBooking.asObservable();
    }

    addBooking(formData: FormGroup) {
        const data = {
            cust_username: formData.value.cust_username,
            adult_count: formData.value.adult_count,
            child_count: formData.value.child_count,
            book_time: formData.value.booking_time,
            booking_status: formData.value.booking_status,
        };
        console.log(data);
        this.http
            .post(`${this.url}new_user`, data)
            .pipe(
                tap(() => {
                    this.updatedBooking.next();
                })
            )
            .subscribe();
    }
    getBooking(): Observable<Booking[]> {
        return this.http.get<Booking[]>(`${this.url}get_users`);
    }
}
