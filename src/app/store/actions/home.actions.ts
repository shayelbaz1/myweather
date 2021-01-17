import { Action } from '@ngrx/store';
import { City } from '../../modals/interface.module';

export const SET_FEATURED_CITY = '[Home] set featured city';
export const SET_FEATURED_CITY_AS_FAV = `[Home] set featured city to Fav city`;
export const ADD_FEATURED_CITY_TO_FAV = '[Add to Fav cmp] set featured city to favorites';
export const REMOVE_FEATURED_CITY_FROM_FAV = '[Add to Fav cmp] remove featured city from favorites';

export class SetFeaturedCity implements Action {
  readonly type = SET_FEATURED_CITY;
  constructor(public payload: City) { }
}

export class SetFeaturedCityAsFav implements Action {
  readonly type = SET_FEATURED_CITY_AS_FAV;
  constructor(public payload: City) { }
}

export class AddFeaturedCityToFav implements Action {
  readonly type = ADD_FEATURED_CITY_TO_FAV;
}

export class RemoveFeaturedCityFromFav implements Action {
  readonly type = REMOVE_FEATURED_CITY_FROM_FAV;
}

export type All =
  SetFeaturedCity |
  AddFeaturedCityToFav |
  RemoveFeaturedCityFromFav |
  SetFeaturedCityAsFav;
