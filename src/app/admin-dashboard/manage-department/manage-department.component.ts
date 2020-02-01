import { DepartmentService } from './../department.service';
import { Department } from './../department-model/department-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-manage-department',
  templateUrl: './manage-department.component.html',
  styleUrls: ['./manage-department.component.css']
})
export class ManageDepartmentComponent implements OnInit {

  displayedColumns: string[] = ['name', 'location', 'services', 'action'];
  dataSource: MatTableDataSource<Department>;
  users: Department[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private departmentService: DepartmentService) { }

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

  onEdit( id: string) {
    console.log('Id on edit department ' + id);
  }

  onDelete( id: string) {
    console.log('Id on Delete department ' + id);
  }

}
