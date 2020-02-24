import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Reviews } from '../models/reviews-model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ReviewsService {
    reviews: Reviews[] = [];
    url = 'http://localhost:4300/api/';
    updatedReview = new Subject<Reviews[]>();
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
    }

    // listener
    reviewListener() {
        return this.updatedReview.asObservable();
    }

    // ADD review details
    addReviews(formData: FormGroup) {
        const reviewData = {
            cust_username: formData.value.cust_username,
            guest_username: formData.value.guest_username,
            review: formData.value.review,
            department_id: formData.value.department_id,
            rating: formData.value.rating,
        };
        this.http
            .post<{ message: string }>(`${this.url}add_review`, reviewData, {
                headers: this.headers,
            })
            .subscribe(res => {
                console.log('Review Data' + res);
                const data = {
                    cust_username: formData.value.cust_username,
                    guest_username: formData.value.guest_username,
                    review: formData.value.review,
                    department_id: formData.value.department_id,
                    rating: formData.value.rating,
                };
                this.reviews.push(data);
                this.updatedReview.next([...this.reviews]);
            });
    }
}
