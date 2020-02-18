import { FormGroup } from '@angular/forms';
import { DepartmentManager } from './../models/department-model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DeptManagerService {
    deptManager: DepartmentManager[] = [];
    url = 'http://localhost:4300/api/';
    updatedManager = new Subject<DepartmentManager[]>();

    constructor(private http: HttpClient) {}
    deptManagerListener() {
        return this.updatedManager.asObservable();
    }

    addDeptManager(name: string, id: number, formData: FormGroup) {
        const ManagerData = {
            emp_username: formData.value.emp_username,
            department_id: id,
            from_date: formData.value.from_date,
            to_date: formData.value.to_date,
        };
        this.http
            .post(`${this.url}new_manager`, ManagerData)
            .pipe(
                tap(() => {
                    this.updatedManager.next();
                })
            )
            .subscribe(result => {
                console.log(result);
            });
    }

    getAllDeptManager(): Observable<DepartmentManager[]> {
        return this.http.get<DepartmentManager[]>(
            `${this.url}get_managerByName
            `
        );
    }
    removeDeptManager(username: string, Id: number) {
        this.http
            .delete(`${this.url}remove_manager/${username}/${Id}`)
            .subscribe(result => {
                this.updatedManager.next();
            });
    }
    getManager(userName: string) {
        return this.http.get(`${this.url}get_manager/${userName}`);
    }
}
