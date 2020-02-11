import { RoomTypeService } from './../../services/room-type.service';
import { RoomType } from './../../models/room-model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-room-type',
    templateUrl: './room-type.component.html',
    styleUrls: ['./room-type.component.css'],
})
export class RoomTypeComponent implements OnInit, OnDestroy {
    roomFormGroup: FormGroup;
    displayedColumns: string[] = [
        'sr',
        'room_type_name',
        'room_type_rate',
        'action',
    ];
    dataSource: MatTableDataSource<RoomType>;
    users: RoomType[] = [];
    private dataSub = new Subscription();
    constructor(private roomTypeService: RoomTypeService) {}

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    ngOnInit() {
        this.roomTypeService.getAllRooms();

        this.roomTypeService.roomTypeListener().subscribe(result => {
            console.log(result);
            this.users = result;
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
        console.log(this.dataSource);

        this.roomFormGroup = new FormGroup({
            room_type_name: new FormControl('', [Validators.required]),
            room_type_rate: new FormControl('', [Validators.required]),
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

    onDelete(name: string) {
        this.roomTypeService.removeRoom(name);
        console.log('Id on Delete department ' + name);
    }

    ngOnDestroy() {
        this.dataSub.unsubscribe();
    }
    onSubmit(formDirective: FormGroupDirective) {
        if (this.roomFormGroup.invalid) {
            return;
        } else {
            this.roomTypeService.addRoomTypeDetail(this.roomFormGroup);
            this.roomFormGroup.reset();
            formDirective.resetForm();
        }
    }
}
