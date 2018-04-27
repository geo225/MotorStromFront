import { Injectable } from '@angular/core';
import { Car } from './car';
import { CARS } from './mock-cars';
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import { MessageService } from './message.service';
@Injectable()
export class CarService {
  getCars(): Observable<Car[]> {
    this.messageService.add('CarService: fetched Cars');
    return of(CARS);
  }
  constructor(private messageService: MessageService) { }

}
