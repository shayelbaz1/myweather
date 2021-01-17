import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import * as user from './user.reducer';
import * as favorite from './favorite.reducer';
import * as home from './home.reducer';
import * as weather from './weather.reducer';
import * as weatherDetails from './weather-details.reducer';
import * as search from './search.reducer';
import { City, CityData, WeekWeather } from '../../modals/interface.module';

import { environment } from '../../../environments/environment';
import { User } from 'src/app/modals/user.interface';

export interface State {
  readonly user: User;
  readonly favorite: favorite.State;
  readonly home: home.State;
  readonly weather: CityData;
  readonly weatherDetails: WeekWeather;
  readonly search: City[];
}

export const reducers: ActionReducerMap<State> = {
  user: user.reducer,
  favorite: favorite.reducer,
  home: home.reducer,
  weather: weather.reducer,
  weatherDetails: weatherDetails.reducer,
  search: search.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
