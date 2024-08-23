import { Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    // console.log(isPlatformBrowser(PLATFORM_ID));
    console.log(this.udd.getValue());
    if (localStorage.getItem('userToken') != null) {
      this.decodeData();
    }
  }
  udd = new BehaviorSubject(null); //حولتها للنوع دا علشان اقدر اتابعها

  register(userdata: object): Observable<any> {
    return this._HttpClient.post('', userdata);
  }

  login(loginData: object): Observable<any> {
    return this._HttpClient.post('', loginData);
  }
  decodeData(): void {
    this.udd.next(jwtDecode(`${localStorage.getItem('userToken')}`)); // عشان اغير القيمه
  }
  logOut() {
    localStorage.removeItem('userToken');
    this.udd.next(null);
    this._Router.navigate(['/login']);
  }
}
