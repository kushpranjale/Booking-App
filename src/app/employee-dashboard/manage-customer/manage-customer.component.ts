import { CustomerService } from './../services/customer.service';
import { CustomerDetail } from './../employee-models/customer-model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatDialog,
} from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-manage-customer',
    templateUrl: './manage-customer.component.html',
    styleUrls: ['./manage-customer.component.css'],
})
export class MANAGECustomerComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        'sr',
        'cust_username',
        'first_name',
        'last_name',
        'mobile',
        'fax',
        'email',
        'phone',
        'age',
        'address',
        'gender',
        'kyc_type',
        'kyc_number',
        'kyc_proof',
        'cust_type',
        'nationality',
        'action',
    ];
    dataSource: MatTableDataSource<CustomerDetail>;
    users: CustomerDetail[] = [];
    private dataSub = new Subscription();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    constructor(
        private customerService: CustomerService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.customerService.customerListener().subscribe(result => {
            this.getAllCustomer();
        });
        this.getAllCustomer();
    }
    getAllCustomer() {
        this.customerService.getAllCustomer().subscribe(result => {
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
        // const dialogRef = this.dialog.open(ManagerDialogComponent, {
        //     width: '600px',
        //     // height: '500px',
        //     data: { id: id, username: Username },
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     // this.animal = result;
        // });
    }

    onDelete(id: number, username: string) {
        // this.departmentManagerService.removeDeptManager(username, id);
        console.log('Id on Delete department ' + id + '  ' + username);
    }

    ngOnDestroy() {
        this.dataSub.unsubscribe();
    }
}
