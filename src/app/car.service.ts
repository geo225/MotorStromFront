import { Injectable } from '@angular/core';
import { Car } from './car';
// import { CARS } from './mock-cars';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class CarService {
  private MotorStromURL = 'http://localhost:3001/api/v1/car';
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getCars(): Observable<Car[]> {
    return this.http.get<Car>(this.MotorStromURL).map(data => { return data.Cars; })
      .pipe(
        tap(cars => this.log(`fetched Cars`)),
        catchError(this.handleError('getCar', []))
      );
  }
  getCar(id: string): Observable<Car> {
      const url = `${this.MotorStromURL}/${id}`;
    return this.http.get<Car>(url).map(data => { return data.Car; })
      .pipe(
      tap(_ => this.log(`fetched Car id=${id}`)),
      catchError(this.handleError<Car>(`getCar id=${id}`))
    );
  }
  updateCar (car: Car): Observable<any> {
    const url = `${this.MotorStromURL}/${car._id}`;
    return this.http.put(url, car, httpOptions).pipe(
      tap(_ => this.log(`updated Car id=${car._id}`)),
      catchError(this.handleError<any>('updateCar'))
    );
  }
  addCar (car: Car): Observable<Car> {
    return this.http.post<Car>(this.MotorStromURL, car, httpOptions).pipe(
      tap(() => this.log(`added car`)),
      catchError(this.handleError<Car>('addCar'))
    );
  }
  deleteCar (car: Car): Observable<Car> {
    const id = car._id;
    const url = `${this.MotorStromURL}/${id}`;
    return this.http.delete<Car>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Car id=${id}`)),
      catchError(this.handleError<Car>('deleteCar'))
    );
  }
  private log(message: string) {
    this.messageService.add('CarService: ' + message);
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
}
