import { Action } from '@ngrx/store';
import { City } from '../../modals/interface.module';
// import { Observable } from 'rxjs';

export const FILTER_CITY_LIST = '[Search cmp] Filter cities list';
export const SEARCH_FOR_A_CITY = '[Search cmp] search cities for autocomplete feature';
export const SEARCH_FOR_A_CITY_ON_SUCCESS = '[Search cmp] On-Success search cities for autocomplete feature';

export class FilterList implements Action {
  readonly type = FILTER_CITY_LIST;
  constructor(public payload: string) { }
}

export class SearchCity implements Action {
  readonly type = SEARCH_FOR_A_CITY;
  constructor(public payload: string) { }
}

export class SearchCityOnSuccess implements Action {
  readonly type = SEARCH_FOR_A_CITY_ON_SUCCESS;
  constructor(public payload: City[]) { }
}


export type All =
  FilterList |
  SearchCity |
  SearchCityOnSuccess;
