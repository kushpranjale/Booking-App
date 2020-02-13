import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EmployeeSalariesDetail } from '../../models/employee-details-model';
import { Subscription } from 'rxjs';
import { EmployeeSalaryDetailsService } from '../../services/employee-salary-details.service';

@Component({
    selector: 'app-manage-salary-details',
    templateUrl: './manage-salary-details.component.html',
    styleUrls: ['./manage-salary-details.component.css'],
})
export class ManageSalaryDetailsComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    salarysort: MatSort;
    displayedSalaryColumns: string[] = [
        'emp_username',
        'salary',
        'from_date',
        'to_date',
        'action',
    ];
    salarydatasource: MatTableDataSource<EmployeeSalariesDetail>;
    private dataSub = new Subscription();
    salaryUser: EmployeeSalariesDetail[] = [];
    constructor(
        private employeeSalariesService: EmployeeSalaryDetailsService
    ) {}

    ngOnInit() {
        this.employeeSalariesService.getAllSalary();
        this.employeeSalariesService
            .employeeSalaryListener()
            .subscribe(result => {
                console.log(result);
                this.salaryUser = result;
                this.salarydatasource = new MatTableDataSource(this.salaryUser);
                this.salarydatasource.paginator = this.paginator;
                this.salarydatasource.sort = this.sort;
            });
    }
    applyFilter(filterValue: string) {
        this.salarydatasource.filter = filterValue.trim().toLowerCase();

        if (this.salarydatasource.paginator) {
            this.salarydatasource.paginator.firstPage();
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
