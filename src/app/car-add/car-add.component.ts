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
  description = new FormControl('', [Validators.min(1900),Validators.max(2018),Validators.required]);
  cv = new FormControl('', [Validators.min(0),Validators.max(2000), Validators.required]);
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
      this.description.hasError('min') ? 'Tiene que ser superior a 1900' :
        this.description.hasError('max') ? 'Tiene que ser inferior al año actual' :
      '';
  }
  getCVErrorMessage(){
    return this.cv.hasError('required') ? 'El campo es Requerido' :
      this.cv.hasError('min') ? 'Tiene que ser superior a 0' :
        this.cv.hasError('max') ? 'Tiene que ser inferior a 2000' :
        '';
  }
  constructor(private carService: CarService,
              private router: Router,
              private location: Location,
              private toastr: ToastrService,
  ) {}

  ngOnInit() {
    // this.resetForm()
  }
  // resetForm(){
  //   this.car = {
  //     _id:'',
  //     name:'',
  //     Marca:'',
  //     CV:0,
  //     category:'',
  //     description:'',
  //     img:'',
  //     Car:'',
  //     Cars:'',
  //     userId:'',
  //     userEmail:''
  //   }
  // }
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
    const userId = localStorage.getItem('user_id');
    const userEmail = localStorage.getItem('user_email');
    this.carService.addCar({name, Marca, category, description, CV,img,userId,userEmail} as Car)
      .subscribe(() => {
        this.goBack();
          this.toastr.success('Coche añadido con Exito');
      },
        error => {
          this.toastr.error('Error al añadir Coche');
        }
      );
  }
}
