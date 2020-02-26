import { GuestService } from './../../services/guest.service';
import { Guest } from './../../employee-models/booking-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-show-guests',
    templateUrl: './show-guests.component.html',
    styleUrls: ['./show-guests.component.css'],
})
export class ShowGuestsComponent implements OnInit {
    displayedColumns: string[] = [
        'sr',
        'cust_username',
        'adult_count',
        'child_count',
        'book_time',
        'booking_status',
        'action',
    ];
    dataSource: MatTableDataSource<Guest>;
    users: Guest[] = [];
    private dataSub = new Subscription();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    constructor(private guestService: GuestService) {}

    ngOnInit() {
        this.getAllGuest();
        this.guestService.guestListener().subscribe(() => {
            this.getAllGuest();
        });
    }

    getAllGuest() {
        this.guestService.getGuest().subscribe(result => {
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
    onEdit() {}
    onDelete() {}
}
