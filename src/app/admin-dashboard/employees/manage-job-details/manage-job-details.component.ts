import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EmployeeJobDetail } from '../../models/employee-details-model';
import { Subscription } from 'rxjs';
import { EmployeeJobDetailsService } from '../../services/employee-job-details.service';

@Component({
    selector: 'app-manage-job-details',
    templateUrl: './manage-job-details.component.html',
    styleUrls: ['./manage-job-details.component.css'],
})
export class ManageJobDetailsComponent implements OnInit, OnDestroy {
    displayedJobColumns: string[] = [
        'emp_username',
        'title',
        'from_date',
        'to_date',
        'action',
    ];
    private dataSub = new Subscription();
    jobdataSource: MatTableDataSource<EmployeeJobDetail>;
    jobUser: EmployeeJobDetail[] = [];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private employeeJobService: EmployeeJobDetailsService) {}

    ngOnInit() {
        this.employeeJobService.getAllJob();
        this.employeeJobService.employeeJobListener().subscribe(result => {
            console.log(result);
            this.jobUser = result;
            this.jobdataSource = new MatTableDataSource(this.jobUser);
            this.jobdataSource.paginator = this.paginator;
            this.jobdataSource.sort = this.sort;
        });
    }
    applyFilter(filterValue: string) {
        this.jobdataSource.filter = filterValue.trim().toLowerCase();

        if (this.jobdataSource.paginator) {
            this.jobdataSource.paginator.firstPage();
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
