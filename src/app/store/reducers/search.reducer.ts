import * as SearchActions from '../actions/search.actions';
import { City } from '../../modals/interface.module';

export type Action = SearchActions.All;

const defaultState = [];

export function reducer(state: City[] = defaultState, action: Action): City[] {
  switch (action.type) {
    case SearchActions.SEARCH_FOR_A_CITY_ON_SUCCESS:
      return action.payload;
    case SearchActions.FILTER_CITY_LIST:
      return Array.isArray(state)
        ? state.filter(city => city.localizedName.toLowerCase().indexOf(action.payload) === 0)
        : state;
    default:
      return defaultState;
  }
}
