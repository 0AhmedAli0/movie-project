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
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private athuntication: AuthService, private _Router: Router) {}
  registerError: string = '';
  rejistterForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(8),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(8),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(16),
      Validators.max(80),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z]{2,5}$/),
    ]),
  });
  submitRegister(forminfo: FormGroup) {
    this.athuntication.register(forminfo.value).subscribe((response) => {
      if (response.massage == 'success') {
        //go to login
        this._Router.navigate(['/login']); //وديني للصفحه بتاعه اللوجن
      } else {
        this.registerError = 'email is already register';
      }
    });
  }
}
