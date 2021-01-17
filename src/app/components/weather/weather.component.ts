import { Component, Input, isDevMode } from '@angular/core';
import { City, CityData, WeekWeather, DayWeather } from '../../modals/interface.module';
import { State } from '../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  @Input() weekWeather: WeekWeather;
  @Input() featuredCity: City | null;

  imgIconSrc: string;
  dailyForcasts: DayWeather[];
  cityData$: Observable<CityData>;
  isMetric = true;

  path = isDevMode() ?
    `../../../../assets/imgs/` :
    `https://idodidodi.github.io/Weather_app/assets/imgs/`;

  constructor(private store: Store<State>) {
    this.cityData$ = this.store.select('weather');
  }
}
