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
    displayedBankColumns: string[] = [
        'sr',
        'emp_username',
        'bank_name',
        'bank_branch',
        'acc_no',
        'IFSC_code',
        'PAN_Id',
        'action',
    ];
    displayedDepColumns: string[] = [
        'emp_username',
        'department_id',
        'from_date',
        'to_date',
        'action',
    ];
    displayedJobColumns: string[] = [
        'emp_username',
        'title',
        'from_date',
        'to_date',
        'action',
    ];
    displayedSalaryColumns: string[] = [
        'emp_username',
        'salary',
        'from_date',
        'to_date',
        'action',
    ];
    dataSource: MatTableDataSource<EmployeeDetail>;
    bankdataSource: MatTableDataSource<EmployeeBankDetail>;
    depdataSource: MatTableDataSource<EmployeeDepartmentDetail>;
    jobdataSource: MatTableDataSource<EmployeeJobDetail>;
    salarydatasource: MatTableDataSource<EmployeeSalariesDetail>;
    private dataSub = new Subscription();
    users: EmployeeDetail[] = [];
    bankUser: EmployeeBankDetail[] = [];
    depUser: EmployeeDepartmentDetail[] = [];
    jobUser: EmployeeJobDetail[] = [];
    salaryUser: EmployeeSalariesDetail[] = [];
    oneDepartment: EmployeeDetail[] = [];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    bankpaginator: MatPaginator;
    deppaginator: MatPaginator;
    jobpaginator: MatPaginator;
    salarypaginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    banksort: MatSort;
    depsort: MatSort;
    jobsort: MatSort;
    salarysort: MatSort;

    constructor(
        private employeeService: EmployeeDetailsService,
        private employeeBankService: EmployeeBankDetailsService,
        private employeeDepService: EmployeeDepartmentDetailsService,
        private employeeSalariesService: EmployeeSalaryDetailsService,
        private employeeJobService: EmployeeJobDetailsService
    ) {}

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
        this.employeeBankService.getAllBank();
        this.employeeBankService.employeeBankListener().subscribe(result => {
            console.log(result);
            this.bankUser = result;
            this.bankdataSource = new MatTableDataSource(this.bankUser);
            this.bankdataSource.paginator = this.bankpaginator;
            this.bankdataSource.sort = this.banksort;
        });
        // get all department details
        this.employeeDepService.getAllDep();
        this.employeeDepService
            .employeeDepartmentListener()
            .subscribe(result => {
                console.log(result);
                this.depUser = result;
                this.depdataSource = new MatTableDataSource(this.depUser);
                this.depdataSource.paginator = this.deppaginator;
                this.depdataSource.sort = this.depsort;
            });
        // get all job details
        this.employeeJobService.getAllJob();
        this.employeeJobService.employeeJobListener().subscribe(result => {
            console.log(result);
            this.jobUser = result;
            this.jobdataSource = new MatTableDataSource(this.jobUser);
            this.jobdataSource.paginator = this.jobpaginator;
            this.jobdataSource.sort = this.jobsort;
        });
        // get all salaries
        this.employeeSalariesService.getAllSalary();
        this.employeeSalariesService
            .employeeSalaryListener()
            .subscribe(result => {
                console.log(result);
                this.salaryUser = result;
                this.salarydatasource = new MatTableDataSource(this.salaryUser);
                this.salarydatasource.paginator = this.salarypaginator;
                this.salarydatasource.sort = this.salarysort;
            });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.bankdataSource.filter = filterValue.trim().toLowerCase();
        this.depdataSource.filter = filterValue.trim().toLowerCase();
        this.jobdataSource.filter = filterValue.trim().toLowerCase();
        this.salarydatasource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
        if (this.bankdataSource.paginator) {
            this.bankdataSource.paginator.firstPage();
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
