import { RoomTypeService } from './../../services/room-type.service';
import { RoomType } from './../../models/room-model';
import {
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatSnackBar,
    MatDialog,
} from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
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
    constructor(
        private roomTypeService: RoomTypeService,
        private dialog: MatDialog
    ) {}

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    ngOnInit() {
        this.roomTypeService.roomTypeListener().subscribe(() => {
            this.getAllRoomType();
        });
        this.getAllRoomType();
        this.roomFormGroup = new FormGroup({
            room_type_name: new FormControl('', [Validators.required]),
            room_type_rate: new FormControl('', [Validators.required]),
        });
    }
    getAllRoomType() {
        this.roomTypeService.getAllRooms().subscribe(result => {
            this.roomTypeService.getAllRooms();
            console.log(result);
            this.users = result;
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
        console.log(this.dataSource);
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onEdit(id: number) {
        console.log('Id on edit department ' + id);

        const dialogRef = this.dialog.open(DialogOverviewRoomType, {
            width: '600px',
            // height: '500px',
            data: id,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
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
@Component({
    // tslint:disable-next-line: component-selector
    selector: 'dialog-overview-roomType',
    templateUrl: 'dialog_overview_roomType.html',
    styleUrls: ['./room-type.component.css'],
})
export class DialogOverviewRoomType implements OnInit {
    roomTypeData: RoomType[] = [];
    roomFormGroup: FormGroup;
    id: number;
    constructor(
        public dialogRef: MatDialogRef<DialogOverviewRoomType>,
        @Inject(MAT_DIALOG_DATA) public data: string,
        private roomTypeService: RoomTypeService,
        private snackBar: MatSnackBar
    ) {}
    ngOnInit() {
        this.roomFormGroup = new FormGroup({
            room_type_name: new FormControl('', [Validators.required]),
            room_type_rate: new FormControl('', [Validators.required]),
        });
        this.roomTypeService
            .getRoomType(this.data)
            .subscribe((result: RoomType) => {
                this.id = result[0].room_type_id;
                this.roomFormGroup.setValue({
                    room_type_name: result[0].room_type_name,
                    room_type_rate: result[0].room_type_rate,
                });
            });
        this.roomFormGroup.get('room_type_name').disable();
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    onSubmit(formDirective: FormGroupDirective) {
        if (this.roomFormGroup.invalid) {
            return;
        } else {
            this.roomTypeService.updateRoom(
                this.id,
                this.data,
                this.roomFormGroup.value.room_type_rate
            );
            console.log(this.data);
            this.snackBar.open('Successfully Update', 'close', {
                duration: 2000,
            });
            this.dialogRef.close();
        }
    }
}
