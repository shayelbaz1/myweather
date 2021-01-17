import { Component, OnInit, Input, isDevMode } from '@angular/core';
import { utils } from 'src/app/services/utils.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent {

  @Input() day;

  constructor() { }

  path = isDevMode() ?
    `../../../../assets/imgs/` :
    `https://shayelbaz1.github.io/Weather_app/assets/imgs/`;

  getIconSrc(number) {
    return utils.getWeatherIconLink(number);
  }

}
