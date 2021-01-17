import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { WeatherService } from '../../services/weather-service/weather.service';
import { StringDispatch, CityDispatch } from '../../modals/interface.module';

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) { }

  loadWeekWeather$ = createEffect(() => this.actions$.pipe(
    ofType('[Weather cmp] load week weather to given city'),
    mergeMap((action: StringDispatch) => this.weatherService.getWeekWeather(action.payload)
      .pipe(
        map(weekWeather => ({
          type: '[Weather cmp] On success - load week weather to given city',
          payload: weekWeather
        })),
        catchError(() => EMPTY)
      ))
  )
  );

  loadCurrentWeather$ = createEffect(() => this.actions$.pipe(
    ofType('[Weather cmp] Load current weather to given city'),
    mergeMap((action: CityDispatch) => this.weatherService.getCurrentWeather(action.payload)
      .pipe(
        map(currentWeather => ({
          type: '[Weather cmp] Load current weather to given city on success',
          payload: currentWeather
        })),
        catchError(() => EMPTY)
      ))
  )
  );

  loadAllCurrentWeather$ = createEffect(() => this.actions$.pipe(
    ofType('[Weather cmp] Load current weather to given city'),
    switchMap(() => this.weatherService.getAllCurrentWeather()
      .pipe(
        map(allCurrentWeather =>
        ({
          type: '[Favorite cmp] Load current weather to all fav cities on success',
          payload: allCurrentWeather
        })
        ), catchError(() => EMPTY))
    )
  )
  );

  loadCitiesForAutocomplete$ = createEffect(() => this.actions$.pipe(
    ofType('[Search cmp] search cities for autocomplete feature'),
    switchMap((action: StringDispatch) => this.weatherService.getCities(action.payload)
      .pipe(
        map(cities =>
        ({
          type: '[Search cmp] On-Success search cities for autocomplete feature',
          payload: cities
        })
        ), catchError(() => EMPTY))
    )
  )
  );

}
