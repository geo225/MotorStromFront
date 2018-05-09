import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean = false;
  constructor(private userService : UserService,private router : Router, private toastr: ToastrService) { }
  email = new FormControl('', [Validators.required]);
  password = new FormControl('',[Validators.required]);
  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'El campo es Requeirdo' :
        '';
  };
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'El campo es Requerido' :
        '';
  };
  ngOnInit() {
  }

  OnSubmit(email,password){
    this.userService.userAuthentication(email,password).subscribe((data : any)=>{
        localStorage.setItem('userToken',data.token);
        localStorage.setItem('user_id',data.user._id);
        localStorage.setItem('user_email',data.user.email);
        localStorage.setItem('user_username',data.user.displayName);
        this.router.navigate(['/dashboard']);
        this.toastr.success('Usuario Autentificado con exito');
      },
      (err : HttpErrorResponse)=>{
      if (err.status === 403){
        this.toastr.error('Contraseña Incorrecta');
      }else if (err.status === 404){
        this.toastr.error('Usuario no existe');
      }else{
        this.toastr.error('Fallo al Autentificar');
      }
        this.isLoginError = true;
      });
  }

}
