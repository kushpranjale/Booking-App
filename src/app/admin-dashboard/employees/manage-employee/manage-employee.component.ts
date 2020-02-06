import { EmployeeDetail } from './../../models/employee-details-model';
import { EmployeeDetailsService } from './../../services/employee-details.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {

    displayedColumns: string[] = ['sr' , 'emp_username',
                                 'first_name', 'last_name', 'gender', 'address',
                                   'mobile', 'email', 'date_of_birth', 'date_of_joining',
                                  'date_of_resign', 'kyc_type', 'kyc_number', 'kyc_proof', 'action'];
  dataSource: MatTableDataSource<EmployeeDetail>;
  users: EmployeeDetail[] = [];
  oneDepartment: EmployeeDetail[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private employeeService: EmployeeDetailsService) { }

  ngOnInit() {
    this.employeeService.getAllEmployee();
    this.employeeService.employeeListener().subscribe( result => {
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

  onEdit( id: number) {console.log('Id on edit department ' + id); }


    // const dialogRef = this.dialog.open(DialogOverview, {
    //   width: '600px',
    //   // height: '500px',
    //   data: id

    // });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //    // this.animal = result;
  //   });
  // }

  onDelete( id: number) {
    // this.departmentService.removeDepartment(id);
    console.log('Id on Delete department ' + id);
  }

}
