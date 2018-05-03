import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService} from '../car.service';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: Car[];
  getCars(): void {
    this.carService.getCars()
      .subscribe(data => this.cars = data);
  }
  add(name: string, Marca: string, category: string, description: string, CV: number): void {
    name = name.trim();
    if (!name) { return; }
    this.carService.addCar({ name, Marca, category, description, CV } as Car)
      .subscribe(() => this.getCars()
      );
  }
  delete(car: Car): void {
    this.carService.deleteCar(car)
      .subscribe(() => this.getCars()
    );
  }
  constructor(private carService: CarService) { }
  ngOnInit() {
    this.getCars();
  }
}

