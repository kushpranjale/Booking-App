import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Complaints } from '../models/complaint-model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ComplaintsService {
    complaint: Complaints[] = [];
    url = 'http://localhost:4300/api/';
    updatedComplaint = new Subject<Complaints[]>();
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
    }

    // listener
    complaintListener() {
        return this.updatedComplaint.asObservable();
    }

    // ADD complaint details
    addComplaint(id: number, formData: FormGroup) {
        const complaintData = {
            complaint_id: formData.value.complaint_id,
            department_id: id,
            room_no: formData.value.room_no,
            complaint_time: formData.value.complaint_time,
            complaint_status: formData.value.complaint_status,
            customer_review: formData.value.customer_review,
        };
        this.http
            .post<{ message: string; Id: number }>(
                `${this.url}add_complaint`,
                complaintData,
                { headers: this.headers }
            )
            .subscribe(res => {
                console.log('Complaint Data' + res);
                const data = {
                    complaint_id: res.Id,
                    department_id: formData.value.department_id,
                    room_no: formData.value.room_no,
                    complaint_time: formData.value.complaint_time,
                    complaint_status: formData.value.complaint_status,
                    customer_review: formData.value.customer_review,
                };
                this.complaint.push(data);
                this.updatedComplaint.next([...this.complaint]);
            });
    }
}
