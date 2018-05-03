import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr'
import 'rxjs/add/operator/map';
import { User } from './user';
import {catchError, tap} from "rxjs/operators";
import {Car} from "./car";

@Injectable()
export class UserService {
  private MotorStromURL = 'http://localhost:3001/api/v1';
  constructor(private http: HttpClient,private toastr: ToastrService) { }

  registerUser(user: User){
    const body = {
      email: user.email,
      password: user.password,
      displayName: user.displayName,
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.MotorStromURL + '/signup', body,{headers : reqHeader})
  }

  userAuthentication(email, password) {
    var data = {
      email: email,
      password: password
    }
    var reqHeader = new HttpHeaders({ 'No-Auth':'True' });
    return this.http.post(this.MotorStromURL + '/signin', data, { headers: reqHeader });
  }

  // getUserClaims(){
  //   return  this.http.get(this.MotorStromURL+'/api/GetUserClaims');
  // }

}
