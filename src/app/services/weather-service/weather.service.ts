import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { City, WeekWeather, APIWeekWeather, APICurrentWeather, APICity, CityData } from '../../modals/interface.module';
import { Observable, throwError, combineLatest } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers/index';


import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { utils } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly apikey = environment.apiKey;
  isMetricTempUnit = true;
  defaultCity$: Observable<City>;
  favorites$: Observable<City[]>;
  featuredCity$: Observable<City>;
  private path(type, cityId = '', lat = 0, lon = 0) {
    switch (type) {
      case 'cities':
        return `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apikey}&q=`;
      case 'currentWeather':
        return `https://dataservice.accuweather.com/currentconditions/v1/${cityId}?apikey=${this.apikey}&details=false`;
      case 'weekWeather':
        return `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityId}?apikey=${this.apikey}&metric=${this.isMetricTempUnit}`;
      case 'geoLocation':
        return `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.apikey}&q=${lat},${lon}&toplevel=true`;
    }
  }

  constructor(
    private httpclient: HttpClient,
    private store: Store<State>,
    private toastr: ToastrService
  ) { }

  private handleError(errorResponse: HttpErrorResponse) {
    if (isDevMode()) {
      if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side error: ', errorResponse.error.message);
      } else {
        console.error(' Server Side Error: ', errorResponse);
      }
    }
    return throwError(
      'There is a problem with the service. We are working to fix it '
    );
  }
  getCities(query: string = 't'): Observable<City[]> {
    const filterValue = query.toLowerCase();
    return this.httpclient.get<APICity[]>(this.path('cities') + filterValue)
      .pipe(
        map(cities => cities.filter(city => city.LocalizedName.toLowerCase().indexOf(filterValue) === 0)),
        map(data => (data.map(city => ({
          key: city.Key,
          localizedName: city.LocalizedName
        })
        ))), catchError(this.handleError));
  }

  getCurrentWeather(city: City): Observable<CityData> {
    if (city.key) {
      return this.httpclient.get<APICurrentWeather>(this.path('currentWeather', city.key))
        .pipe(
          map(data => ({
            key: city.key,
            localizedName: city.localizedName,
            weatherText: data[0].WeatherText,
            weatherIcon: data[0].WeatherIcon,
            celsDegree: data[0].Temperature.Metric.Value,
            fahrDegree: data[0].Temperature.Imperial.Value,
          })
          ),
          catchError(this.handleError));
    } else {
      this.toastr.error('Error', 'City not found');
    }
  }

  getAllCurrentWeather(): Observable<CityData[]> {
    let newFavCities: Observable<CityData>[];
    this.store.select('favorite').subscribe(
      data => {
        newFavCities = data.favoriteKeyMap.map(
          cityData => {
            const city = {
              key: cityData.key,
              localizedName: cityData.localizedName,
            };
            return this.getCurrentWeather(city);
          });
      });
    return combineLatest(newFavCities);
  }

  getWeekWeather(cityId: string): Observable<WeekWeather> {
    return this.httpclient.get<APIWeekWeather>(this.path('weekWeather', cityId))
      .pipe(
        map(data => ({
          text: data.Headline.Text,
          dailyForecasts: data.DailyForecasts.map(
            dayForcast => {
              let day: string;
              switch (new Date(dayForcast.Date).getDay()) {
                case 0:
                  day = 'Sunday';
                  break;
                case 1:
                  day = 'Monday';
                  break;
                case 2:
                  day = 'Tuesday';
                  break;
                case 3:
                  day = 'Wednesday';
                  break;
                case 4:
                  day = 'Thursday';
                  break;
                case 5:
                  day = 'Friday';
                  break;
                case 6:
                  day = 'Saturday';
              }
              return {
                maxTemp: dayForcast.Temperature.Maximum.Value,
                date: dayForcast.Date,
                dayName: day,
                icon: dayForcast.Day.Icon
              };
            }
          )
        })), catchError(this.handleError)
      );
  }

  getDefaultCity = () => {
    return this.defaultCity$;
  }

  setCityByGeoLocation = (lat: number, lon: number, setDefaultCity) => {
    this.httpclient.get<APICity>(this.path('geoLocation', '', lat, lon)).subscribe(
      data => {
        const city = {
          localizedName: data.LocalizedName,
          key: data.Key
        };
        setDefaultCity(city);
      }, error => { this.toastr.error('Geolocation not found', 'Error'); }
    );
  }
}
