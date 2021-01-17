import * as HomeActions from '../actions/home.actions';
import { City } from '../../modals/interface.module';
import { utils } from 'src/app/services/utils.service';

export type Action = HomeActions.All;

export interface State {
  localizedName: string;
  key: string;
}

const defaultState: City = {
  key: '215854',
  localizedName: 'Tel-Aviv',
};

const newState = (obj1, obj2) => {
  return Object.assign({}, obj1, obj2);
};

function initCity() {
  let city: City = utils.loadFromSessionStorage('city')
  if (!!city) {
    return city
  } else {
    return defaultState
  }
}

export function reducer(state: City = initCity(), action: Action): State {
  switch (action.type) {
    case HomeActions.SET_FEATURED_CITY:
      return action.payload;
    case HomeActions.SET_FEATURED_CITY_AS_FAV:
      return { ...action.payload, ...{ isFavorite: true } }
    // return newState( action.payload, { isFavorite: true } );
    case HomeActions.ADD_FEATURED_CITY_TO_FAV:
      return newState(state, { isFavorite: true });
    case HomeActions.REMOVE_FEATURED_CITY_FROM_FAV:
      return newState(state, { isFavorite: false });
    default:
      return state;
  }
}

export { defaultState };
