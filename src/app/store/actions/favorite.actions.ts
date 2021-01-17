import { Action } from '@ngrx/store';
import { CityData, City } from '../../modals/interface.module';
import { Observable } from 'rxjs';

export const ADD_FAV_CITY = '[Add to Fav CMP] Add city to Fav';
export const REMOVE_FAV_CITY = '[Add to Fav CMP || Fav page] Remove city  from Fav';
export const LOAD_ALL_CURRENT_WEATHER = '[Favorite cmp] Load current weather to all fav cities';
export const LOAD_ALL_CURRENT_WEATHER_SUCCESS = '[Favorite cmp] Load current weather to all fav cities on success';

export class AddFavCity implements Action {
  readonly type = ADD_FAV_CITY;
  constructor(public payload: CityData) { }
}

export class RemoveFavCity implements Action {
  readonly type = REMOVE_FAV_CITY;
  constructor(public payload: string) { }
}

export class LoadAllCurrentWeather implements Action {
  readonly type = LOAD_ALL_CURRENT_WEATHER;
}

export class LoadAllCurrentWeatherSuccess implements Action {
  readonly type = LOAD_ALL_CURRENT_WEATHER_SUCCESS;
  constructor(public payload: CityData[]) { }
}

export type All =
  AddFavCity |
  RemoveFavCity |
  LoadAllCurrentWeatherSuccess |
  LoadAllCurrentWeather;
