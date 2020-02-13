import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EmployeeDepartmentDetail } from '../../models/employee-details-model';
import { EmployeeDepartmentDetailsService } from '../../services/employee-department-details.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-manage-department-details',
    templateUrl: './manage-department-details.component.html',
    styleUrls: ['./manage-department-details.component.css'],
})
export class ManageDepartmentDetailsComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    depdataSource: MatTableDataSource<EmployeeDepartmentDetail>;
    displayedDepColumns: string[] = [
        'emp_username',
        'department_id',
        'from_date',
        'to_date',
        'action',
    ];
    depUser: EmployeeDepartmentDetail[] = [];
    private dataSub = new Subscription();
    constructor(private employeeDepService: EmployeeDepartmentDetailsService) {}

    ngOnInit() {
        this.employeeDepService.getAllDep();
        this.employeeDepService
            .employeeDepartmentListener()
            .subscribe(result => {
                console.log(result);
                this.depUser = result;
                this.depdataSource = new MatTableDataSource(this.depUser);
                this.depdataSource.paginator = this.paginator;
                this.depdataSource.sort = this.sort;
            });
    }
    applyFilter(filterValue: string) {
        this.depdataSource.filter = filterValue.trim().toLowerCase();

        if (this.depdataSource.paginator) {
            this.depdataSource.paginator.firstPage();
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
