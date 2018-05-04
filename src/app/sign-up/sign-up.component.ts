import { Component, OnInit } from '@angular/core';
import { NgForm ,FormControl, Validators} from '@angular/forms';
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

  getErrorMessage() {
    return this.email.hasError('required') ? 'El campo es Requeirdo' :
      this.email.hasError('email') ? 'Email invalido' :
        '';
  }

  constructor(private userService: UserService, private toastr: ToastrService,private router : Router) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      _id: '',
      displayName: '',
      password: '',
      email: '',
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.hasOwnProperty('token') == true) {
          this.resetForm(form);
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
