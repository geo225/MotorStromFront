import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CarService} from "../car.service";
import { Car } from '../car';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  @Input() car: Car;
  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private location: Location
  ) { }
  ngOnInit(): void {
    this.getCar();
  }
  getCar(): void {
    let name = this.route.params(params._value.name;
    this.carService.getCar(name)
      .subscribe(car => this.car = car);
  }

}
