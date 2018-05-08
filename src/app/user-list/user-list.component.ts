import {AfterViewInit,ViewChild, Component, OnInit , ViewEncapsulation} from '@angular/core';
import { User} from '../user';
import { UserService } from '../user.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import {CarService} from "../car.service";
import {Car} from "../car";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class UserListComponent implements OnInit, AfterViewInit {
  users: User[];
  getUsers(): void {
    this.userService.getUsers()
      .subscribe(data => this.users = data);
  }
  delete(user: User): void {
    this.userService.deleteUser(user)
      .subscribe(() => this.getUsers()
      );
  }
  update(user: User): void {
    this.userService.updateUser(user)
      .subscribe(() => {
      }, (err : HttpErrorResponse)=>{
      });
  }

  displayedColumns = ['Username', 'Email'];
  dataSource= new MatTableDataSource();
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    this.dataSource.filter = filterValue;
  }
  constructor(private userService: UserService,private router : Router) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(data => {
        this.dataSource.data = data;
      });
    this.getUsers();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
