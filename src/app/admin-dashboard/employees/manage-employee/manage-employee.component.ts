import { EmployeeSalaryDetailsService } from './../../services/employee-salary-details.service';
import { EmployeeJobDetailsService } from './../../services/employee-job-details.service';
import { EmployeeDepartmentDetailsService } from './../../services/employee-department-details.service';
import { EmployeeBankDetailsService } from './../../services/employee-bank-details.service';
import {
    EmployeeDetail,
    EmployeeBankDetail,
    EmployeeDepartmentDetail,
    EmployeeJobDetail,
    EmployeeSalariesDetail,
} from './../../models/employee-details-model';
import { EmployeeDetailsService } from './../../services/employee-details.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-manage-employee',
    templateUrl: './manage-employee.component.html',
    styleUrls: ['./manage-employee.component.css'],
})
export class ManageEmployeeComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        'sr',
        'emp_username',
        'first_name',
        'last_name',
        'gender',
        'address',
        'mobile',
        'email',
        'date_of_birth',
        'date_of_joining',
        'date_of_resign',
        'kyc_type',
        'kyc_number',
        'kyc_proof',
        'action',
    ];

    dataSource: MatTableDataSource<EmployeeDetail>;

    private dataSub = new Subscription();
    users: EmployeeDetail[] = [];

    oneDepartment: EmployeeDetail[] = [];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private employeeService: EmployeeDetailsService) {}

    ngOnInit() {
        // get all employee details
        this.employeeService.getAllEmployee();
        this.employeeService.employeeListener().subscribe(result => {
            console.log(result);
            this.users = result;
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
        // get all bank details

        // get all department details

        // get all job details

        // get all salaries
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onEdit(id: number) {
        console.log('Id on edit department ' + id);
    }

    // const dialogRef = this.dialog.open(DialogOverview, {
    //   width: '600px',
    //   // height: '500px',
    //   data: id

    // });

    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed');
    //    // this.animal = result;
    //   });
    // }

    onDelete(id: number) {
        // this.departmentService.removeDepartment(id);
        console.log('Id on Delete department ' + id);
    }

    ngOnDestroy() {
        this.dataSub.unsubscribe();
    }
}
