import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean = false;
  constructor(private userService : UserService,private router : Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  OnSubmit(userName,password){
    this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
        localStorage.setItem('userToken',data.token);
        this.router.navigate(['/home']);
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
