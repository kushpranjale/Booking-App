import { Injectable } from '@angular/core';
import { ComplaintDetail } from '../employee-models/complaint-model';
import { Subject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CustomerDetail } from '../employee-models/customer-model';

@Injectable({
    providedIn: 'root',
})
export class ComplaintService {
    complaint: ComplaintDetail[] = [];
    url = 'http://localhost:4300/api/';
    updatedComplaint = new Subject<ComplaintDetail[]>();

    constructor(private http: HttpClient) {}

    complaintListener() {
        return this.updatedComplaint.asObservable();
    }

    // GET all complaints
    getAllComplaint(): Observable<ComplaintDetail[]> {
        return this.http.get<ComplaintDetail[]>(`${this.url}get_complaints`);
    }

    // GET complaint by department_id
    getComplaint(department_id: number) {
        return this.http.get(`${this.url}get_complaint/${department_id}`);
    }

    // Remove complaint by complaint_id
    removeComplaint(complaint_id: number) {
        this.http
            .delete(`${this.url}remove_complaint/${complaint_id}`)
            .subscribe(result => {
                this.updatedComplaint.next();
            });
    }
}
