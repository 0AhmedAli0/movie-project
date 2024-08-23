import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  isLogin: boolean = true;
  ngOnInit(): void {
    this._AuthService.udd.subscribe(() => {
      // if (this._AuthService.udd.getValue() != null) {
      //   this.isLogin = true;
      // } else {
      //   this.isLogin = false;
      // }
    });
  }
  callLogout() {
    this._AuthService.logOut();
  }
  goToSearch(e: any) {
    if (e.target.value.length > 0) {
      this._Router.navigate(['/search', e.target.value]);
    } else {
      this._Router.navigate(['/home']);
    }
  }
}
