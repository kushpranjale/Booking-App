import { ExtraModel } from './../../models/extra-model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { ExtrasService } from '../../services/extras.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'app-Manageextra',
    templateUrl: './Manageextra.component.html',
    styleUrls: ['./Manageextra.component.css'],
})
export class ManageextraComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        'sr',
        'extra_type',
        'extra_sub_type',
        'extra_charge',
        'action',
    ];
    dataSource: MatTableDataSource<ExtraModel>;
    users: ExtraModel[] = [];
    private dataSub = new Subscription();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private extraService: ExtrasService) {}

    ngOnInit() {
        this.extraService.getAllExtras();
        this.extraService.extraListener().subscribe(result => {
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

    onEdit(id: number) {
        console.log('Id on edit department ' + id);

        // const dialogRef = this.dialog.open(DialogOverview, {
        //     width: '600px',
        //     // height: '500px',
        //     data: id,
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     // this.animal = result;
        // });
    }

    onDelete(id: number) {
        this.extraService.removeExtra(id);
        console.log('Id on Delete department ' + id);
    }

    ngOnDestroy() {
        this.dataSub.unsubscribe();
    }
}
