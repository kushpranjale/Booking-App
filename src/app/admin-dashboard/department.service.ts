import { FormGroup } from '@angular/forms';
import { Department } from './department-model/department-model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  department: Department[] = [];
  url = 'http://localhost:3000/api/';
  updatedDepartment = new Subject<Department[]>();
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    // this.headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
  }

  // listener
  departmentListner() {
    return this.updatedDepartment.asObservable();
  }

  // adding department data
  addDepartment(formData: FormGroup) {
    const departmentData = {
      department_id: formData.value.department_id,
      department_name: formData.value.department_name,
      location: formData.value.location,
      services: formData.value.services
    };
    this.http
      .post<{ message: string; Id: number }>(
        `${this.url}new_department`,
        departmentData,
      )
      .subscribe(res => {
        console.log('Department data' + res);
        const data = {
          department_id: res.Id,
          department_name: formData.value.department_name,
          location: formData.value.location,
          services: formData.value.services
        };
        this.department.push(data);
        this.updatedDepartment.next([...this.department]);
      });
  }

   // Get all departments

   getAllDepartments() {
      this.http.get(`${this.url}get_departments`).subscribe( (result: Department[]) => {
         console.log(result);
         this.department = result;
         this.updatedDepartment.next([...this.department]);
      });
   }
}
