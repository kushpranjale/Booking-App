import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ComplaintService } from '../services/complaint.service';
import { ComplaintDetail } from '../employee-models/complaint-model';
import {
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatDialog,
} from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-complaints',
    templateUrl: './complaints.component.html',
    styleUrls: ['./complaints.component.css'],
})
export class ComplaintsComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        'sr',
        'department_id',
        'room_no',
        'complaint_time',
        'complaint_status',
        'customer_review',
        'action',
    ];
    dataSource: MatTableDataSource<ComplaintDetail>;
    users: ComplaintDetail[] = [];
    private dataSub = new Subscription();

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(
        private complaintService: ComplaintService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.complaintService.complaintListener().subscribe(result => {
            this.getAllComplaint();
        });
        this.getAllComplaint();
    }

    getAllComplaint() {
        this.complaintService.getAllComplaint().subscribe(result => {
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

    onDelete(complaint_id: number) {
        this.complaintService.removeComplaint(complaint_id);
        console.log('ID on Delete Complaint' + complaint_id);
    }

    ngOnDestroy() {
        this.dataSub.unsubscribe();
    }
}
