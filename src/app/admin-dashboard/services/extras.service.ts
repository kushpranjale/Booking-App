import { FormGroup } from '@angular/forms';
import { ExtraModel } from './../models/extra-model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ExtrasService {
    url = 'http://localhost:4300/api/';
    updatedExtras = new Subject<ExtraModel[]>();
    extrasDetails: ExtraModel[] = [];
    constructor(private http: HttpClient) {}
    extraListener() {
        return this.updatedExtras.asObservable();
    }
    addExtraDetail(formData: FormGroup) {
        const extraData = {
            extra_type: formData.value.extra_type,
            extra_sub_type: formData.value.extra_sub_type,
            extra_charge: formData.value.extra_charge,
        };
        console.log('extra data');
        console.log(extraData);
        this.http
            .post<{ message: string; id: number }>(
                `${this.url}add_extra`,
                extraData
            )
            .subscribe(result => {
                console.log('Room type ' + result.message);
                // this.epm_status = result.status;
                this.extrasDetails.push({
                    extra_id: result.id,
                    extra_type: extraData.extra_type,
                    extra_sub_type: extraData.extra_sub_type,
                    extra_charge: extraData.extra_charge,
                });
                this.updatedExtras.next([...this.extrasDetails]);
            });
    }
    getAllExtras() {
        this.http
            .get(`${this.url}get_extra`)
            .subscribe((result: ExtraModel[]) => {
                this.extrasDetails = result;
                this.updatedExtras.next([...this.extrasDetails]);
            });
    }
    removeExtra(id: number) {
        this.http.delete(`${this.url}remove_extra/${id}`).subscribe(result => {
            console.log(result);
            const ExtraData = this.extrasDetails.filter(d => d.extra_id !== id);
            this.updatedExtras.next([...ExtraData]);
        });
    }
}
