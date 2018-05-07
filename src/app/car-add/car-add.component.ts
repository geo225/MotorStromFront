import { Component, OnInit } from '@angular/core';
import {Car} from "../car";
import { FormControl, Validators} from '@angular/forms';
import { CarService} from '../car.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  constructor(private carService: CarService,
              private router : Router,
              private location: Location,
              private toastr: ToastrService
  ) { }
  name = new FormControl('', [Validators.required]);
  marca = new FormControl('',[Validators.required]);
  description = new FormControl('', [Validators.required]);
  CV = new FormControl('', [Validators.required]);
  categoryControl = new FormControl('', [Validators.required]);
  avatar = new FormControl('',[Validators.required]);
  getNameErrorMessage() {
    return this.name.hasError('required') ? 'El campo es Requeirdo' :
          '';
  };
  getMarcaErrorMessage() {
    return this.name.hasError('required') ? 'El campo es Requeirdo' :
      '';
  };
  ngOnInit() {

  }
  goBack(): void {
    this.location.back();
  }
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.avatar.setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }
  add(name: string, Marca: string, category: string, description: string, CV: number): void {
    name = name.trim();
    if (!name) { return; }
    this.carService.addCar({ name, Marca, category, description, CV } as Car)
      .subscribe(() => this.goBack()
      );
  }
}
