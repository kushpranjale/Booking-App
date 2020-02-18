import { DeptManagerService } from './../services/dept-manager.service';
import { DepartmentManager } from './../models/department-model';
import { OnInit, ViewChild, OnDestroy, Component, Inject } from '@angular/core';
import {
    MatTableDataSource,
    MatSort,
    MatPaginator,
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatSnackBar,
    MatDialog,
} from '@angular/material';
import { Subscription } from 'rxjs';
import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
} from '@angular/forms';
import { DepartmentService } from '../services/department.service';
import { EmployeeDetailsService } from '../services/employee-details.service';

@Component({
    selector: 'app-manage-dept-manager',
    templateUrl: './manage-dept-manager.component.html',
    styleUrls: ['./manage-dept-manager.component.css'],
})
export class ManageDeptManagerComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        'sr',
        'department_id',
        'emp_username',
        'from_date',
        'to_date',
        'action',
    ];
    dataSource: MatTableDataSource<DepartmentManager>;
    users: DepartmentManager[] = [];
    private dataSub = new Subscription();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private departmentManagerService: DeptManagerService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.departmentManagerService
            .deptManagerListener()
            .subscribe(result => {
                this.getAllManager();
            });
        this.getAllManager();
    }

    getAllManager() {
        this.departmentManagerService.getAllDeptManager().subscribe(result => {
            console.log(result);
            this.users = result;
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onEdit(id: number, Username: string) {
        console.log('Id on edit department ' + id);
        const dialogRef = this.dialog.open(ManagerDialogComponent, {
            width: '600px',
            // height: '500px',
            data: { id: id, username: Username },
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }

    onDelete(id: number, username: string) {
        this.departmentManagerService.removeDeptManager(username, id);
        console.log('Id on Delete department ' + id + '  ' + username);
    }

    ngOnDestroy() {
        this.dataSub.unsubscribe();
    }
}

@Component({
    selector: 'app-dialog-overview',
    templateUrl: './manager_dialog_overview.htm',
    styleUrls: ['./manage-dept-manager.component.css'],
})
export class ManagerDialogComponent implements OnInit {
    managerData: DepartmentManager[] = [];
    managerGroup: FormGroup;
    id: number;
    constructor(
        public dialogRef: MatDialogRef<ManagerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private departmentService: DepartmentService,
        private employeeService: EmployeeDetailsService,
        private managerService: DeptManagerService,
        private snackBar: MatSnackBar
    ) {}
    ngOnInit() {
        console.log(this.data);
        this.managerGroup = new FormGroup({
            emp_username: new FormControl('', [Validators.required]),
            department_id: new FormControl('', [Validators.required]),
            from_date: new FormControl('', [Validators.required]),
            to_date: new FormControl('', [Validators.required]),
        });
        this.managerService
            .getManager(this.data.username)
            .subscribe((result: DepartmentManager) => {
                // this.id = result[0].room_type_id;

                this.managerGroup.setValue({
                    emp_username: result[0].emp_username,
                    department_id: result[0].department_id,
                    from_date: result[0].from_date,
                    to_date: result[0].to_date,
                });
            });
        // this.roomFormGroup.get('room_type_name').disable();
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    onSubmit(formDirective: FormGroupDirective) {
        //     if (this.managerGroup.invalid) {
        //         return;
        //     } else {
        //         this.managerService.updatedManager(
        //             this.id,
        //             this.data,
        //             this.roomFormGroup.value.room_type_rate
        //         );
        //         console.log(this.data);
        //         this.snackBar.open('Successfully Update', 'close', {
        //             duration: 2000,
        //         });
        //         this.dialogRef.close();
    }
}
