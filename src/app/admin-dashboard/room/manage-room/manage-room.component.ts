import {
    FormGroupDirective,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import { ManageRoomService } from './../../services/manage-room.service';
import { Rooms, RoomsData, RoomType } from './../../models/room-model';
import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import {
    MatTableDataSource,
    MatSort,
    MatPaginator,
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatSnackBar,
} from '@angular/material';
import { Department } from '../../models/department-model';
import { Subscription } from 'rxjs';
import { RoomTypeService } from '../../services/room-type.service';

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
        'floor',
        'pool_facing',
        'action',
    ];
    dataSource: MatTableDataSource<Rooms>;
    users: RoomsData[] = [];
    private dataSub = new Subscription();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private roomDetailService: ManageRoomService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.getAllRooms();

        this.roomDetailService.roomListener().subscribe(result => {
            this.getAllRooms();
        });
    }
    getAllRooms() {
        this.roomDetailService.getAllRooms().subscribe(result => {
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
    onEdit(id: string) {
        console.log('Id on edit department ' + id);

        const dialogRef = this.dialog.open(DialogOverviewForRoom, {
            width: '600px',
            // height: '500px',
            data: id,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }
    onDelete(roomNumber: string) {
        this.roomDetailService.removeRoom(roomNumber);
        console.log('deleted room ' + roomNumber);
    }

    ngOnDestroy() {
        this.dataSub.unsubscribe();
    }
}
@Component({
    // tslint:disable-next-line: component-selector
    selector: 'diolog-room-overview-dialog',
    templateUrl: 'dialog_overview.html',
    styleUrls: ['./manage-room.component.css'],
})
export class DialogOverviewForRoom implements OnInit {
    roomFormGroup: FormGroup;
    RoomData: RoomType[] = [];
    options: RoomType[] = [];
    id: number;
    oldId: number;
    room_no: string;
    room_type_id: string;
    constructor(
        public dialogRef: MatDialogRef<DialogOverviewForRoom>,
        @Inject(MAT_DIALOG_DATA) public data: string,
        private manageRoomService: ManageRoomService,
        private snackBar: MatSnackBar,
        private roomTypeService: RoomTypeService
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.roomTypeService.getAllRooms();
        this.roomTypeService.roomTypeListener().subscribe(result => {
            this.RoomData = result;
            this.options = this.RoomData;
        });
        console.log(this.data);

        this.roomFormGroup = new FormGroup({
            room_no: new FormControl('', [Validators.required]),
            room_type_id: new FormControl('', [Validators.required]),
            no_of_people: new FormControl('', [Validators.required]),
            room_status: new FormControl('', [Validators.required]),
        });
        this.manageRoomService
            .getRoom(this.data)
            .subscribe((result: RoomsData) => {
                this.oldId = result[0].room_type_id;
                this.room_no = result[0].room_no;
                this.room_type_id = result[0].room_type_name;
                console.log(result[0].department_name);
                this.roomFormGroup.setValue({
                    room_no: result[0].room_no,
                    room_type_id: result[0].room_type_name,
                    no_of_people: result[0].no_of_people,
                    room_status: result[0].room_status,
                });
            });
        this.roomFormGroup.controls['room_no'].disable();
        this.roomFormGroup.controls['room_type_id'].disable();
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        const filter = this.RoomData.filter(p => {
            if (p.room_type_name.includes(filterValue)) {
                return p.room_type_name.includes(filterValue);
            } else {
                return null;
            }
        });
        this.options = filter;
    }
    onchange(id: number) {
        this.id = id;
        console.log(name);
    }

    onSubmit(formDirective: FormGroupDirective) {
        console.log(this.roomFormGroup.value);
        console.log(this.id);
        if (this.roomFormGroup.invalid) {
            return;
        } else {
            this.manageRoomService.updateRoom(
                this.room_type_id,
                this.oldId,
                this.room_no,
                this.roomFormGroup
            );
            // console.log(this.departmentGroup.value);
            this.snackBar.open('Successfully Update', 'close', {
                duration: 2000,
            });
            this.dialogRef.close();
        }
    }
}
