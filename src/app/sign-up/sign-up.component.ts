import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',[Validators.minLength(6), Validators.required]);
  username = new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(10)])
  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'El campo es Requeirdo' :
      this.email.hasError('email') ? 'Email invalido' :
        this.email.value.trim()===0 ? 'Campo Vacio' :
        '';
  };
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'El campo es Requerido' :
      this.password.hasError( 'minlength') ? 'El campo tiene que tener 6 caracteres como minimo' :
        '';
  };
  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'El campo es Requerido' :
      this.username.hasError( 'minlength') ? 'El campo tiene que tener 4 caracteres como minimo' :
        this.username.hasError( 'maxlength') ? 'El campo tiene que tener 10 caracteres como maximo' :
          '';
  };

  constructor(private userService: UserService, private toastr: ToastrService,private router : Router) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {
    this.user = {
      _id: '',
      displayName: '',
      password: '',
      email: '',
      Users: '',
    }
  }

  OnSubmit(email,password,displayName) {
    this.user ={
      _id: '',
      displayName: displayName,
      password: password,
      email: email,
      Users: ''
    }
    this.userService.registerUser(this.user)
      .subscribe((data: any) => {
        if (data.hasOwnProperty('token') == true) {
          this.resetForm();
          localStorage.setItem('userToken',data.token);
          this.router.navigate(['/dashboard']);
          this.toastr.success('Usuario registrado con Exito');
        }
        else
          this.toastr.error(data.Errors);
      },
        error => {
          if (error.status === 409){
            this.toastr.error('Usuario Duplicado');
          }else{
            this.toastr.error('Error al crear Usuario');
          }
        })
  }

}
