import {Component, OnInit} from '@angular/core';
import {Car} from "../car";
import {FormControl, Validators} from '@angular/forms';
import {CarService} from '../car.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  car: Car;
  name = new FormControl('', [Validators.required]);
  marca = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  cv = new FormControl('', [Validators.required]);
  categoryControl = new FormControl('', [Validators.required]);
  avatar:any;

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'El campo es Requerido' :
      'Campo Vacio';
  };

  getMarcaErrorMessage() {
    return this.marca.hasError('required') ? 'El campo es Requerido' :
      '';
  };
  getDescriptionErrorMessage(){
    return this.description.hasError('required') ? 'El campo es Requerido':
      '';
  }
  getCVErrorMessage(){
    return this.cv.hasError('required') ? 'El campo es Requerido':
      '';
  }
  constructor(private carService: CarService,
              private router: Router,
              private location: Location,
              private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.resetForm()
  }
  resetForm(){
    this.car = {
      _id:'',
      name:'',
      Marca:'',
      CV:0,
      category:'',
      description:'',
      img:'',
      Car:'',
      Cars:''
    }
  }

  goBack(): void {
    this.location.back();
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.file) {
      let file = event.file;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.avatar = {
          // filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        }
        console.log(this.avatar)
      };
    }
  }
  resetAvatar() {
    this.avatar=undefined;
    console.log(this.avatar)
  }

  add(name: string, Marca: string, category: string, description: string, CV: number): void {
    console.log(this.avatar)
    const img = this.avatar;
    name = name.trim();
    if (!name) {
      return;
    }
    this.carService.addCar({name, Marca, category, description, CV,img} as Car)
      .subscribe(() => this.resetForm()
      );
  }
}
