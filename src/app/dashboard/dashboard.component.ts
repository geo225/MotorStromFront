import { Component, OnInit } from '@angular/core';
import { Car} from "../car";
import { CarService} from "../car.service";
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cars: Car[] = []
  constructor(private router: Router,private carService: CarService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getCars();
  }
  getCars(): void {
    this.carService.getCars()
      .subscribe(cars => this.cars = cars.slice(0, 5));
  }
}
