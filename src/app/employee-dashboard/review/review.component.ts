import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { ReviewDetail } from '../employee-models/review-model';
import {
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatDialog,
} from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        'sr',
        'cust_username',
        'guest_username',
        'review',
        'department_id',
        'rating',
        'action',
    ];
    dataSource: MatTableDataSource<ReviewDetail>;
    users: ReviewDetail[] = [];
    private dataSub = new Subscription();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private reviewService: ReviewService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.getAllReview();
        this.reviewService.reviewListener().subscribe(result => {
            this.getAllReview();
        });
    }

    getAllReview() {
        this.reviewService.getAllReviews().subscribe(result => {
            this.users = result;
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(result);
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onDelete(cust_username: string, guest_username: string) {
        this.reviewService.removeReview(cust_username, guest_username);
        console.log(
            'UserName of Customer & Guest is' + cust_username,
            guest_username
        );
    }

    ngOnDestroy() {
        this.dataSub.unsubscribe();
    }
}
