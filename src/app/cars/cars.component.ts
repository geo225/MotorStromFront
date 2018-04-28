import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CARS } from '../mock-cars';
import { CarService} from '../car.service';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars : Car[];
  getCars(): void {
    this.carService.getCars()
      .subscribe(cars => this.cars = cars);
  }
  constructor(private carService: CarService) { }

  ngOnInit() {
    this.getCars();
  }

}
