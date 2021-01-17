import { Action } from '@ngrx/store';
import { User } from 'src/app/modals/user.interface';

export const LOAD_CURRENT_USER = '[Home cmp] Load current user';
export const SET_USER = '[Login page] Add current user';
export const LOGOUT_USER = '[Home page] logout current user';

export class LoadCurrentUser implements Action {
  readonly type = LOAD_CURRENT_USER;
}

export class LoginUser implements Action {
  readonly type = SET_USER;

  constructor(public user: User) { }
}

export class LogoutUser implements Action {
  readonly type = LOGOUT_USER;
}

export type Actions = LoadCurrentUser | LoginUser | LogoutUser
