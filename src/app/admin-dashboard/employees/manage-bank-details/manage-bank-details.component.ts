import {
    Component,
    OnInit,
    ViewChild,
    ChangeDetectionStrategy,
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EmployeeBankDetail } from '../../models/employee-details-model';
import { EmployeeBankDetailsService } from '../../services/employee-bank-details.service';

@Component({
    selector: 'app-manage-bank-details',
    templateUrl: './manage-bank-details.component.html',
    styleUrls: ['./manage-bank-details.component.css'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageBankDetailsComponent implements OnInit {
    bankUser: EmployeeBankDetail[] = [];
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
    bankdataSource: MatTableDataSource<EmployeeBankDetail>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private employeeBankService: EmployeeBankDetailsService) {}

    ngOnInit() {
        this.employeeBankService.getAllBank();
        this.employeeBankService.employeeBankListener().subscribe(result => {
            console.log(result);
            this.bankUser = result;
            this.bankdataSource = new MatTableDataSource(this.bankUser);
            this.bankdataSource.paginator = this.paginator;
            this.bankdataSource.sort = this.sort;
        });
    }
    applyFilter(filterValue: string) {
        this.bankdataSource.filter = filterValue.trim().toLowerCase();

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
}
