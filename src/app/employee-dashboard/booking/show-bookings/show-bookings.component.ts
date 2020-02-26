import { Booking } from './../../employee-models/booking-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { BookingService } from '../../services/booking.service';

@Component({
    selector: 'app-show-bookings',
    templateUrl: './show-bookings.component.html',
    styleUrls: ['./show-bookings.component.css'],
})
export class ShowBookingsComponent implements OnInit {
    displayedColumns: string[] = [
        'sr',
        'cust_username',
        'adult_count',
        'child_count',
        'book_time',
        'booking_status',
        'action',
    ];
    dataSource: MatTableDataSource<Booking>;
    users: Booking[] = [];
    private dataSub = new Subscription();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    constructor(private bookingService: BookingService) {}

    ngOnInit() {
        this.getAllBooking();
        this.bookingService.BookingListener().subscribe(() => {
            this.getAllBooking();
        });
    }
    getAllBooking() {
        this.bookingService.getBooking().subscribe(result => {
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
