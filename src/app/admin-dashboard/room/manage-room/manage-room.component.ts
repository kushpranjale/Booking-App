import { ManageRoomService } from './../../services/manage-room.service';
import { Rooms } from './../../models/room-model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Department } from '../../models/department-model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-manage-room',
    templateUrl: './manage-room.component.html',
    styleUrls: ['./manage-room.component.css'],
})
export class ManageRoomComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        'sr',
        'room_no',
        'room_type_id',
        'no_of_people',
        'room_status',
        'action',
    ];
    dataSource: MatTableDataSource<Rooms>;
    users: Rooms[] = [];
    private dataSub = new Subscription();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private roomDetailService: ManageRoomService) {}

    ngOnInit() {
        this.roomDetailService.getAllRooms();

        this.roomDetailService.roomListener().subscribe(result => {
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
        // this.departmentService.removeDepartment(id);
        console.log('Id on Delete department ' + id);
    }

    ngOnDestroy() {
        this.dataSub.unsubscribe();
    }
}
