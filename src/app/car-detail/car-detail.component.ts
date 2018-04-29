import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CarService} from '../car.service';
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
  goBack(): void {
    this.location.back();
  }
  getCar(): void {
    const id = this.route.snapshot.paramMap.get('name');
    this.carService.getCar(id)
      .subscribe(car => this.car = car);
  }
}
