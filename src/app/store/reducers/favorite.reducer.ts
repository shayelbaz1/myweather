import * as FavoriteActions from '../actions/favorite.actions';
import { CityData } from '../../modals/interface.module';
import { utils } from 'src/app/services/utils.service';
// import { Observable } from 'rxjs';

export type Action = FavoriteActions.All;

export interface State {
  favoriteKeyMap: CityData[];
}

// export interface AllWeatherState {
//   favoriteKeyMap$: [Observable<CityData>]
// }

const defaultState: State = {
  favoriteKeyMap: [{
    key: '215854',
    localizedName: 'Tel Aviv',
    celsDegree: 24,
    fahrDegree: 82,
    weatherText: 'Pleasant',
    weatherIcon: 3
  }, {
    key: '124594',
    localizedName: 'Aarhus',
    celsDegree: 25,
    fahrDegree: 82.5,
    weatherText: 'Pleasant',
    weatherIcon: 3
  }, {
    key: '186933',
    localizedName: 'Tela',
    celsDegree: 20,
    fahrDegree: 70,
    weatherText: 'Coldish',
    weatherIcon: 3
  }]
};

function initState() {
  let favorites: State = utils.loadFromStorage('favorites')
  if (!!favorites) {
    return favorites
  } else {
    utils.storeToStorage('favorites', defaultState)
    return defaultState
  }
}

// Refarctor favKeyMap;
export function reducer(state: State = initState(), action: Action): State {
  switch (action.type) {
    case FavoriteActions.LOAD_ALL_CURRENT_WEATHER_SUCCESS:
      return { favoriteKeyMap: action.payload };
    case FavoriteActions.ADD_FAV_CITY:
      return { favoriteKeyMap: [...state.favoriteKeyMap, action.payload] };
    case FavoriteActions.REMOVE_FAV_CITY:
      let i = 0;
      const key = action.payload;
      const newArr = [...state.favoriteKeyMap];
      for (const obj of newArr) {
        if (obj.key === key) {
          newArr.splice(i, 1);
          break;
        }
        i += 1;
      }
      return { favoriteKeyMap: newArr };
    default:
      return state;
  }
}
