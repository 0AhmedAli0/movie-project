import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'movieProject';
  constructor(private _AuthService: AuthService) {
    this._AuthService.udd.subscribe(() => {
      if (_AuthService.udd.getValue() != null) {
        setTimeout(() => {
          _AuthService.logOut();
        }, 5000);
      }
    });
  }
}
