import { CustomerService } from './../services/customer.service';
import { CustomerDetail } from './../employee-models/customer-model';
import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import {
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatSnackBar,
} from '@angular/material';
import { Subscription } from 'rxjs';
import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
} from '@angular/forms';

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

    onEdit(Username: string) {
        const dialogRef = this.dialog.open(CustomerEditDialog, {
            width: '600px',
            // height: '500px',
            data: Username,
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }

    onDelete(username: string) {
        this.customerService.removeCustomer(username);
        console.log('Id on Delete department   ' + username);
    }

    ngOnDestroy() {
        this.dataSub.unsubscribe();
    }
}

@Component({
    selector: 'app-customer-dialog',
    templateUrl: './customer_dialog.html',
    styleUrls: ['./manage-customer.component.css'],
})
// tslint:disable-next-line: component-class-suffix
export class CustomerEditDialog implements OnInit {
    managerData: CustomerDetail[] = [];
    customerGroup: FormGroup;
    id: string;
    constructor(
        public dialogRef: MatDialogRef<CustomerEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private customerService: CustomerService,

        private snackBar: MatSnackBar
    ) {}
    ngOnInit() {
        console.log(this.data);
        this.customerGroup = new FormGroup({
            cust_username: new FormControl('', [Validators.required]),
            cust_password: new FormControl('', [Validators.required]),
            first_name: new FormControl('', [Validators.required]),
            last_name: new FormControl('', [Validators.required]),
            mobile: new FormControl('', [Validators.required]),
            fax: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            phone: new FormControl('', [Validators.required]),
            age: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            gender: new FormControl('', [Validators.required]),
            kyc_type: new FormControl('', [Validators.required]),
            kyc_number: new FormControl('', [Validators.required]),
            kyc_proof: new FormControl('', [Validators.required]),
            cust_type: new FormControl('', [Validators.required]),
            nationality: new FormControl('', [Validators.required]),
        });
        this.customerService
            .getCustomer(this.data)
            .subscribe((result: CustomerDetail) => {
                this.customerGroup.setValue({
                    cust_username: result[0].cust_username,
                    cust_password: result[0].cust_password,
                    first_name: result[0].first_name,
                    last_name: result[0].last_name,
                    mobile: result[0].mobile,
                    fax: result[0].fax,
                    email: result[0].email,
                    phone: result[0].phone,
                    age: result[0].age,
                    address: result[0].address,
                    gender: result[0].gender,
                    kyc_type: result[0].kyc_type,
                    kyc_number: result[0].kyc_number,
                    kyc_proof: result[0].kyc_proof,
                    cust_type: result[0].cust_type,
                    nationality: result[0].nationality,
                });
            });
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
