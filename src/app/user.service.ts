import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user';

@Injectable()
export class UserService {
  private MotorStromURL = 'http://localhost:3001/api/v1';
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const body = {
      email: user.email,
      password: user.password,
      displayName: user.displayName,
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.MotorStromURL + '/signup', body,{headers : reqHeader});
  }

  userAuthentication(email, password) {
    var data = "email=" + email + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.MotorStromURL + '/signin', data, { headers: reqHeader });
  }

  // getUserClaims(){
  //   return  this.http.get(this.MotorStromURL+'/api/GetUserClaims');
  // }

}
