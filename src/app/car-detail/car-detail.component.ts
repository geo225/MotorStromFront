import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CarService} from '../car.service';
import { Car } from '../car';
import { DomSanitizer } from '@angular/platform-browser';
import {ToastrService} from "ngx-toastr";
import {MatDialog} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import {FormControl, Validators} from "@angular/forms";
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  @Input() car: Car;
 public base64Image: string;
 public imagePath: any;
 private avatar;
 public modeEdit = false;
  name = new FormControl('', [Validators.required]);
  marca = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.min(1900),Validators.max(2018),Validators.required]);
  cv = new FormControl('', [Validators.min(0),Validators.max(2000), Validators.required]);
  categoryControl = new FormControl('', [Validators.required]);

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
  onFileChange(event) {
    let reader = new FileReader();
    if (event.file) {
      let file = event.file;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.car.img = {
          // filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        }
      };
    }
  }
  resetAvatar() {
    this.car.img=this.avatar;
    console.log(this.avatar)
  }
  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private location: Location,
    public domSanitizer: DomSanitizer,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }
  openDialog() {
    const dialogRef = this.dialog.open(DialogConfirm, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result==true){
        this.delete(this.car);
        this.toastr.success('Coche Borrado');
        this.goBack();
      }else{
        this.toastr.warning('Coche no Borrado');
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('name');
    this.carService.getCar(id)
      .subscribe( data => {this.imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
        + data.img.data);
      this.avatar=data.img});

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
  delete(car: Car): void {
    this.carService.deleteCar(car)
      .subscribe(() => {
        this.toastr.success('Coche Borrado');
        this.goBack()
        }
      );
  }
  getCar(): void {
    const id = this.route.snapshot.paramMap.get('name');
    this.carService.getCar(id)
      .subscribe(data =>
        {
          if(data == undefined){
            this.toastr.error('No existe coche')
            this.goBack();
          }else{
            this.car = data
          }
        });
  }
  owner(id){
    if(id==localStorage.getItem('user_id')){
      return true;
    }
    else{
      return false;
    }
  }
  edit(){
    this.toastr.warning('Modo Edición');
    this.modeEdit = true;
  }
  cancel(){
    this.modeEdit = false;
    this.toastr.warning('Modificacion Cancelada');
    this.getCar();

  }
}
@Component({
  selector: 'dialog-confirm',
  templateUrl: '../Modal/modalConfirm.html',
})
export class DialogConfirm {}
