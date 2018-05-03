import {AfterViewInit,ViewChild, Component, OnInit} from '@angular/core';
import { Car } from '../car';
import { CarService} from '../car.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit, AfterViewInit{
  cars: Car[];
  getCars(): void {
    this.carService.getCars()
      .subscribe(data => this.cars = data);
  }
  displayedColumns = ['name', 'marca', 'category', 'description', 'CV'];
  dataSource= new MatTableDataSource();
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
    this.carService.getCars()
      .subscribe(data => {
        this.dataSource.data = data;
      });
    this.getCars();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

