import { ExtrasService } from './../../services/extras.service';
import { ExtraModel } from './../../models/extra-model';
import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import {
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatSnackBar,
} from '@angular/material';
import { Subscription } from 'rxjs';

import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
} from '@angular/forms';
import { RoomTypeService } from '../../services/room-type.service';

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

    constructor(
        private extraService: ExtrasService,
        private dialog: MatDialog
    ) {}

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

        const dialogRef = this.dialog.open(DialogOverviewExtra, {
            width: '600px',
            // height: '500px',
            data: id,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }

    onDelete(id: number) {
        this.extraService.removeExtra(id);
        console.log('Id on Delete department ' + id);
    }

    ngOnDestroy() {
        this.dataSub.unsubscribe();
    }
}

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'dialog-overview-extra',
    templateUrl: 'dialog-overview-extra.html',
    styleUrls: ['./Manageextra.component.css'],
})
export class DialogOverviewExtra implements OnInit {
    ExtraData: ExtraModel[] = [];
    ExtraFormGroup: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExtra>,
        @Inject(MAT_DIALOG_DATA) public data: number,
        private extraService: ExtrasService,
        private snackBar: MatSnackBar
    ) {}
    ngOnInit() {
        this.ExtraFormGroup = new FormGroup({
            extra_type: new FormControl('', [Validators.required]),
            extra_sub_type: new FormControl('', [Validators.required]),
            extra_charge: new FormControl('', [Validators.required]),
        });
        this.extraService
            .getExtra(this.data)
            .subscribe((result: ExtraModel) => {
                this.ExtraFormGroup.setValue({
                    extra_type: result[0].extra_type,
                    extra_sub_type: result[0].extra_sub_type,
                    extra_charge: result[0].extra_charge,
                });
            });
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    onSubmit(formDirective: FormGroupDirective) {
        if (this.ExtraFormGroup.invalid) {
            return;
        } else {
            this.extraService.updateExtra(this.data, this.ExtraFormGroup);
            console.log(this.ExtraFormGroup.value);
            this.snackBar.open('Successfully Update', 'close', {
                duration: 2000,
            });
            this.dialogRef.close();
        }
    }
}
