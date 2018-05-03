import {AfterViewInit,ViewChild, Component, OnInit , ViewEncapsulation} from '@angular/core';
import { Car } from '../car';
import { CarService} from '../car.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  encapsulation : ViewEncapsulation.None
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
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    this.dataSource.filter = filterValue;
  }
  rowClicked(row: any): void {
    this.router.navigate(['/detail/'+row._id]);
  }
  constructor(private carService: CarService,private router : Router) { }
  ngOnInit() {
    this.carService.getCars()
      .subscribe(data => {
        this.dataSource.data = data;
      });
    this.getCars();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

