import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router'; //programatic routing يعني بنقل ما بين الصفحات عن طريق الكود

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private athuntication: AuthService, private _Router: Router) {}
  loginError: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z]{2,5}$/),
    ]),
  });
  submitlogin(forminfo: FormGroup) {
    this.athuntication.login(forminfo.value).subscribe((response) => {
      if (response.massage == 'success') {
        //go to login
        localStorage.setItem('userToken', response.token);
        this.athuntication.decodeData();
        this._Router.navigate(['/home']); //وديني للصفحه بتاعه الرئيسيه
      } else {
        this.loginError = 'email is Wrong';
      }
    });
  }
}
