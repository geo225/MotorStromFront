import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CARS } from '../mock-cars';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  car : Car = {
    name: 'Civic',
    Marca: 'Honda',
    category: 'gasolina',
    description: 'Coche de 1997'
  };
  cars = CARS;
  selectedCar: Car;

  onSelect(car: Car): void {
    this.selectedCar = car;
  }
  constructor() { }

  ngOnInit() {
  }

}
