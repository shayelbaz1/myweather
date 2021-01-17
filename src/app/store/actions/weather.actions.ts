import { Action } from '@ngrx/store';
import { CityData, WeekWeather, City } from '../../modals/interface.module';

export const LOAD_CURRENT_WEATHER = '[Weather cmp] Load current weather to given city';
export const LOAD_CURRENT_WEATHER_SUCCESS = '[Weather cmp] Load current weather to given city on success';
export const LOAD_WEEK_WEATHER = '[Weather cmp] load week weather to given city';
export const LOAD_WEEK_WEATHER_SUCCESS = '[Weather cmp] On success - load week weather to given city';

export class LoadCurrentWeather implements Action {
  readonly type = LOAD_CURRENT_WEATHER;

  constructor(public payload: City) { }
}

export class LoadCurrentWeatherSuccess implements Action {
  readonly type = LOAD_CURRENT_WEATHER_SUCCESS;

  constructor(public payload: CityData) { }
}

export class LoadWeekWeather implements Action {
  readonly type = LOAD_WEEK_WEATHER;

  constructor(public payload: string) { }
}

export class LoadWeekWeatherSuccess implements Action {
  readonly type = LOAD_WEEK_WEATHER_SUCCESS;

  constructor(public payload: WeekWeather) { }
}

export type All =
  LoadCurrentWeather |
  LoadCurrentWeatherSuccess |
  LoadWeekWeather |
  LoadWeekWeatherSuccess;
