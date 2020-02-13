import { FormGroup } from '@angular/forms';
import { DepartmentManager } from './../models/department-model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class DeptManagerService {
    deptManager: DepartmentManager[] = [];
    url = 'http://localhost:4300/api/';
    updatedManager = new Subject<DepartmentManager[]>();

    constructor(private http: HttpClient) {}
    deptManagerListener() {
        this.updatedManager.asObservable();
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
            .subscribe(result => {
                this.deptManager.push({
                    emp_username: ManagerData.emp_username,
                    department_id: id,
                    department_name: name,
                    from_date: ManagerData.from_date,
                    to_date: ManagerData.to_date,
                });
                this.updatedManager.next([...this.deptManager]);
            });
    }

    getAllDeptManager() {
        this.http
            .get(
                `${this.url}get_managers
            `
            )
            .subscribe((result: DepartmentManager[]) => {
                this.deptManager = result;
                this.updatedManager.next([...this.deptManager]);
            });
    }
}
