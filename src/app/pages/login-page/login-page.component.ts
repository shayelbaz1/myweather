import { Component, isDevMode, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from 'src/app/modals/user.interface';
import { State } from 'src/app/store/reducers/index';
import * as UserActions from 'src/app/store/actions/user.actions';
import { utils } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private store: Store<State>) { }

  userName: string;

  ngOnInit(): void { }

  logo = isDevMode() ?
    `../../../assets/logo/logo.png` :
    `https://shayelbaz1.github.io/weatherApp/assets/logo/logo.png`;

  signup(ev) {
    ev.preventDefault();
    if (!this.userName) {
      alert('Invalid user name! please try again');
      return;
    }
    this.userService.signup(this.userName);
    this.router.navigate(['/'])
  }


}
