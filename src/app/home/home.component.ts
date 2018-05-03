import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userClaims: any;

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  Logout() {
    this.toastr.success('Sesion Cerrada');
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);

  }


}
