import { Injectable } from '@angular/core';
import { ReviewDetail } from '../employee-models/review-model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ReviewService {
    review: ReviewDetail[] = [];
    url = 'http://localhost:4300/api/';
    updatedReview = new Subject<ReviewDetail[]>();

    constructor(private http: HttpClient) {}

    reviewListener() {
        return this.updatedReview.asObservable();
    }

    // GET all reviews
    getAllReviews(): Observable<ReviewDetail[]> {
        return this.http.get<ReviewDetail[]>(`${this.url}get_reviews`);
    }

    // DELETE reviews by cust_username AND guest_username
    removeReview(cust_username: string, guest_username: string) {
        this.http
            .delete(
                `${this.url}remove_review/${cust_username}/${guest_username}`
            )
            .subscribe(result => {
                this.updatedReview.next();
            });
    }
}
