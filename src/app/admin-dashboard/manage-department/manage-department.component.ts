import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department-model';
import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-department',
  templateUrl: './manage-department.component.html',
  styleUrls: ['./manage-department.component.css']
})
export class ManageDepartmentComponent implements OnInit,  OnDestroy {

  displayedColumns: string[] = ['sr' , 'name', 'location', 'services', 'action'];
  dataSource: MatTableDataSource<Department>;
  users: Department[] = [];
  private dataSub = new Subscription();
  oneDepartment: Department[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private departmentService: DepartmentService, private dialog: MatDialog) { }

  ngOnInit() {
    this.departmentService.getAllDepartments();
    this.departmentService.departmentListner().subscribe( result => {
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

  onEdit( id: number) {
    console.log('Id on edit department ' + id);

    const dialogRef = this.dialog.open(DialogOverview, {
      width: '600px',
      // height: '500px',
      data: id

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // this.animal = result;
    });
  }

  onDelete( id: number) {
    this.departmentService.removeDepartment(id);
    console.log('Id on Delete department ' + id);
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }

}

@Component (
  {
// tslint:disable-next-line: component-selector
selector : 'diolog-overview-dialog',
templateUrl: 'dialog_overview.html',
styleUrls: ['./manage-department.component.css']
  }
)

// tslint:disable-next-line: component-class-suffix
export class DialogOverview implements OnInit {

   departmentGroup: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: number, private departmentservice: DepartmentService,
    private snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);

    this.departmentGroup = new FormGroup (
      {
        department_name: new FormControl('', [Validators.required]),
        location: new FormControl('', [Validators.required]),
        services: new FormControl('', [Validators.required]),
      }
    );
    this.departmentservice.getDepartment(this.data).subscribe( (result: Department) => {
       console.log(result[0].department_name);
       this.departmentGroup.setValue({
        department_name: result[0].department_name,
        location: result[0].location,
        services: result[0].services,
       });
    });
  }

  onSubmit(formDirective: FormGroupDirective) {
    if ( this.departmentGroup.invalid) {
      return;
    } else {
      this.departmentservice.updateDepartment(this.data, this.departmentGroup);
      console.log(this.departmentGroup.value);
      this.snackBar.open('Successfully Update', 'close', {
          duration: 2000
      });
      this.dialogRef.close();

    }
  }

  }


