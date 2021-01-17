import { City, CityData, WeekWeather } from '../../modals/interface.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../../services/weather-service/weather.service';
import { Store } from '@ngrx/store';
import * as HomeActions from '../../store/actions/home.actions';
import * as WeatherActions from '../../store/actions/weather.actions';
import { Observable } from 'rxjs';
import { State } from '../../store/reducers/index';
import { defaultState as HomeDefaultState } from '../../store/reducers/home.reducer';

import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/internal/operators/take';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { User } from 'src/app/modals/user.interface';
import { utils } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserServiceService,
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private store: Store<State>,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.featuredCity$ = this.store.select('home');
    this.favoriteKeyMap$ = this.store.select('favorite').pipe(take(1));
    this.weekWeather$ = this.store.select('weatherDetails');
    this.key = this.route.snapshot.params.id;
    this.localizedName = this.route.snapshot.params.name;
    this.defaultCity = HomeDefaultState;
  }

  user: User = null;
  key: string;
  localizedName: string;
  defaultCity: City;
  featuredCity$: Observable<City>;
  favoriteKeyMap$: Observable<any>; // To do - give correct type;
  cityData: CityData;
  cityData$: Observable<CityData>;
  weekWeather$: Observable<WeekWeather>;

  ngOnInit() {
    if (!this.key) {
      this.setGeoDefaultCity(this.setDefaultCity);
    } else {
      const city = {
        key: this.key,
        localizedName: this.localizedName,
        isFavorite: true
      };
      this.setFeaturedCity(city);
    }
  }

  checkDefaultCity() {
    const defaultCityName = localStorage.getItem('defaultCityName');
    if (!defaultCityName) {
      this.setGeoDefaultCity(this.setDefaultCity);
    } else {
      const city = {
        localizedName: defaultCityName,
        key: localStorage.getItem('defaultCityKey')
      };
      this.setFeaturedCity(city);
    }
  }


  setGeoDefaultCity(setDefaultCity) {
    this.getGeoLocation(
      this.weatherService.setCityByGeoLocation,
      setDefaultCity,
      this.toastr,
      this.defaultCity
    );
  }

  setDefaultCity = (city: City) => {
    localStorage.setItem('defaultCityName', city.localizedName);
    localStorage.setItem('defaultCityKey', city.key);
    this.setFeaturedCity(city)
  }

  getGeoLocation(setCityByGeoLocation, setDefaultCity, toastr, featuredCity$) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      toastr.info('Geolocation is not supported by this browser', 'Message');
    }
    function showPosition(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setCityByGeoLocation(lat, lon, setDefaultCity);
    }

    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          toastr.error(
            `You denied the request for Geolocation,
            change it on location settings on your browser`,
            'Error',
            { timeOut: 5000 }
          );
          break;
        case error.POSITION_UNAVAILABLE:
          toastr.error('Location information is unavailable.', 'Error');
          break;
        case error.TIMEOUT:
          toastr.error('The request to get user location timed out.', 'Error');
          break;
        case error.UNKNOWN_ERROR:
          toastr.error('An unknown error occurred.', 'Error');
          break;
      }
      setDefaultCity(featuredCity$);
    }
  }

  setFeaturedCity(city: City) {

    if (Object.keys(city).length === 2 || city.isFavorite === false) {
      this.favoriteKeyMap$.subscribe(keys => {
        const cityKeyFoundInFav = keys.favoriteKeyMap.find(favCity => {
          return favCity.key === city.key;
        });
        if (cityKeyFoundInFav) {
          this.store.dispatch(new HomeActions.SetFeaturedCityAsFav(city));
        } else {
          this.store.dispatch(new HomeActions.SetFeaturedCity(city));
        }
      });
    } else if (Object.keys(city).length === 2) {
      this.store.dispatch(new HomeActions.SetFeaturedCityAsFav(city));
    } else {
      this.store.dispatch(new HomeActions.SetFeaturedCity(city));
    }
    this.onSelectingCity(city);
  }

  onSelectingCity(city: City) {
    this.store.dispatch(new WeatherActions.LoadCurrentWeather(city));
    this.store.dispatch(new WeatherActions.LoadWeekWeather(city.key));
  }

}
