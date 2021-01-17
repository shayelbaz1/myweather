import { Injectable, OnInit } from '@angular/core';
import { User } from 'src/app/modals/user.interface';
import { utils } from '../utils.service';
import { USERS } from '../../modals/mock-users';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from 'src/app/store/actions/user.actions';
import { State } from 'src/app/store/reducers/index';


var USER: User = initUser()

function initUser() {
  let user = utils.loadFromStorage('user')
  return user ? user : null
}

@Injectable({ providedIn: 'root' })

export class UserServiceService {

  public loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private store: Store<State>) {
    this.initLoggedIn()
  }

  initLoggedIn() {
    return this.loggedIn.next(!!utils.loadFromStorage('user'))
  }

  getUserState() {
    return this.store.select('user');
  }

  signup(name: string) {
    const user = this.createUser(name);
    this.store.dispatch(new UserActions.LoginUser(user));
    this.loggedIn.next(true)
  }

  logout() {
    this.store.dispatch(new UserActions.LogoutUser());
    this.loggedIn.next(false);
  }

  createUser(newName: string): User {
    return {
      _id: utils.makeId(),
      name: newName,
      imgURL: `https://robohash.org/${newName}/?set=set5`,
      favCities: []
    }
  }

}
