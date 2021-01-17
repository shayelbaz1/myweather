import * as UserActions from '../actions/user.actions';
import { User } from 'src/app/modals/user.interface';
import { utils } from 'src/app/services/utils.service';

const defaultState: User = {
  _id: 'id_1',
  name: 'Shay',
  imgURL: `https://robohash.org/shay/?set=set5`,
  favCities: []
};

function initUser() {
  let user: User = utils.loadFromStorage('user')
  if (!!user) {
    return user
  } else {
    return defaultState
  }
}

export function reducer(state: User = initUser(), action: UserActions.Actions) {
  switch (action.type) {
    case UserActions.LOAD_CURRENT_USER:
      return state;
    case UserActions.SET_USER:
      const user = action.user
      utils.storeToStorage('user', user);
      return state = user;
    case UserActions.LOGOUT_USER:
      utils.removeFromStorage();
      return state = null;
    default:
      return state;
  }
}


