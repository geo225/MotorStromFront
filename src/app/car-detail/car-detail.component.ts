import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CarService} from '../car.service';
import { Car } from '../car';
import { DomSanitizer } from '@angular/platform-browser';
import {ToastrService} from "ngx-toastr";
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  @Input() car: Car;
 public base64Image: string;
 public imagePath: any;
  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private location: Location,
    public domSanitizer: DomSanitizer,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('name');
    this.carService.getCar(id)
      .subscribe( data => {this.imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
        + data.img.data);});

    this.getCar();
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.carService.updateCar(this.car)
      .subscribe(() => {
        this.toastr.success('Coche Modificado');
        this.goBack()
      }, (err : HttpErrorResponse)=>{
        this.toastr.error('Fallo al Modificar');
      });
  }
  getCar(): void {
    const id = this.route.snapshot.paramMap.get('name');
    this.carService.getCar(id)
      .subscribe(data => this.car = data);
  }
}
