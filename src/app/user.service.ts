import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr'
import 'rxjs/add/operator/map';
import { User } from './user';
import {catchError, tap} from "rxjs/operators";
import {Car} from "./car";
import {of} from "rxjs/observable/of";
import { MessageService } from './message.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class UserService {

  private MotorStromURL = 'http://localhost:3001/api/v1';
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add('CarService: ' + message);
  }
  constructor(private http: HttpClient,private toastr: ToastrService, private messageService: MessageService) { }

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

  updateUser (user: User): Observable<any> {
    const url = `${this.MotorStromURL}/user/${user._id}`;
    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => this.log(`updated Car id=${user._id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }
  deleteUser (user: User): Observable<any> {
    const id = user._id;
    const url = `${this.MotorStromURL}/user/${id}`;
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted User id=${id}`)),
      catchError(this.handleError<Car>('deleteUser'))
    );
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User>(this.MotorStromURL+'/user').map(data => { return data.Users; })
      .pipe(
        tap(cars => this.log(`fetched Users`)),
        catchError(this.handleError('getUser', []))
      );
  }

  // getUserClaims(){
  //   return  this.http.get(this.MotorStromURL+'/api/GetUserClaims');
  // }

}
