import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr'
import {MatDialog} from '@angular/material';
import {User} from "../user";
import {HttpErrorResponse} from "@angular/common/http";
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userClaims: any;

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService,
              public dialog: MatDialog,
              private location: Location,
  ) { }
public username
  ngOnInit() {
    this.username=localStorage.getItem('user_username');
    this.getUser(localStorage.getItem('user_id'));
  }
  user:User;
  getUser(id): void {
    this.userService.getUser(id)
      .subscribe(data => this.user = data);
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogConfirm2, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.delete(this.user);
      } else {
        this.toastr.warning('Usuario no Borrado');
      }
    });
  }
    openChangePassword(){
      const dialogRef = this.dialog.open(DialogChangePassword, {
        width: '250px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.delete(this.user);
          this.toastr.success('Coche Borrado');
          this.goBack();
        } else {
          this.toastr.warning('Coche no Borrado');
        }
      });
    }
  Logout(){
    this.toastr.success('Sesion Cerrada');
    localStorage.removeItem('userToken');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_username');
    localStorage.removeItem('user_email');
    this.router.navigate(['/login']);

  }
  delete(user: User): void {
    this.userService.deleteUser(user)
      .subscribe(() => {
        this.toastr.success('Usuario Borrado');
        localStorage.removeItem('userToken');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_username');
        localStorage.removeItem('user_email');
        this.router.navigate(['/login']);
        },(err => {
          console.error(err);
        this.toastr.error('Error al borrar Usuario');
        })
      );
  }
  update(user: User): void {
    this.userService.updateUser(user)
      .subscribe(() => {
      }, (err : HttpErrorResponse)=>{
      });
  }
  goBack(): void {
    this.location.back();
  }


}
@Component({
  selector: 'dialog-change-password',
  templateUrl: '../Modal/modalChangePassword.html',
})
export class DialogChangePassword {}
    @Component({
      selector: 'dialog-confirm',
      templateUrl: '../Modal/modalConfirm.html',
    })
    export class DialogConfirm2 {}
